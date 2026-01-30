import uuid
import requests
import asyncio
from datetime import datetime, timezone
from typing import List, Optional, Dict

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, Field, ConfigDict

from backend.core.database import analyses
from backend.core.config import GNEWS_API_KEY
from backend.core.ner import extract_entities
from backend.core.wikidata import get_wikidata_id
from backend.core.highlight import highlight_incorrect_phrase
from backend.core.confidence import confidence_breakdown
from backend.core.source_rank import rank_sources

from backend.core.ml import analyze_with_ml
from backend.core.ai import analyze_with_ai

router = APIRouter(prefix="/analyze", tags=["Analyze"])

# -------------------------------------------------
# MODELS
# -------------------------------------------------

class AnalysisResult(BaseModel):
    model_config = ConfigDict(extra="ignore")

    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    input_text: str

    claim_type: str
    final_label: str
    final_score: int

    explanation: Optional[str] = None
    highlighted_text: Optional[str] = None

    confidence_breakdown: Dict
    wikidata_id: Optional[str] = None
    ranked_sources: List[Dict]

    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class TextRequest(BaseModel):
    text: str


# -------------------------------------------------
# CLAIM TYPE CLASSIFIER
# -------------------------------------------------

def classify_claim_type(text: str) -> str:
    t = text.lower()

    if any(w in t for w in ["i think", "i believe", "in my opinion", "should"]):
        return "OPINION"

    if any(w in t for w in ["will", "may", "expected", "likely", "forecast"]):
        return "PREDICTION"

    if any(w in t for w in [" is ", " was ", " are ", " has been "]):
        return "FACT"

    return "UNKNOWN"


# -------------------------------------------------
# ROLE EXTRACTION
# -------------------------------------------------

def extract_claimed_role(text: str) -> Optional[str]:
    roles = [
        "cricketer",
        "actor",
        "politician",
        "prime minister",
        "chief minister",
        "president",
        "governor"
    ]

    t = text.lower()
    for role in roles:
        if role in t:
            return role

    return None


# -------------------------------------------------
# WIKIPEDIA FACTS
# -------------------------------------------------

def wikipedia_fact(entity: Optional[str]):
    if not entity:
        return None

    try:
        url = f"https://en.wikipedia.org/api/rest_v1/page/summary/{entity.replace(' ', '_')}"
        res = requests.get(url, timeout=5)

        if res.status_code != 200:
            return None

        data = res.json()
        return {
            "description": data.get("description", ""),
            "url": data.get("content_urls", {}).get("desktop", {}).get("page")
        }
    except Exception:
        return None


# -------------------------------------------------
# GNEWS
# -------------------------------------------------

def gnews_fact(query: str):
    try:
        res = requests.get(
            "https://gnews.io/api/v4/search",
            params={
                "q": query,
                "token": GNEWS_API_KEY,
                "lang": "en",
                "max": 3
            },
            timeout=5
        )

        if res.status_code != 200:
            return []

        data = res.json()
        return [a["url"] for a in data.get("articles", [])]

    except Exception:
        return []


# -------------------------------------------------
# CONTRADICTION LOGIC
# -------------------------------------------------

def contradiction(claimed_role: Optional[str], wiki_desc: str):
    if not claimed_role or not wiki_desc:
        return None

    desc = wiki_desc.lower()

    if claimed_role == "chief minister" and "prime minister" in desc:
        return (
            "India does not have a Chief Minister at the national level. "
            "The country is led by a Prime Minister."
        )

    if claimed_role not in desc:
        return (
            f"The claim states a role ({claimed_role}) that does not match "
            "verified public records."
        )

    return None


# -------------------------------------------------
# ANALYZE ENDPOINT
# -------------------------------------------------

@router.post("/text", response_model=AnalysisResult)
async def analyze_text(req: TextRequest):

    if len(req.text.strip()) < 5:
        raise HTTPException(400, "Text too short")

    claim_type = classify_claim_type(req.text)

    # -------- ENTITY EXTRACTION --------
    entities = extract_entities(req.text)
    main_entity = entities[0]["text"] if entities else None

    # -------- ROLE EXTRACTION --------
    claimed_role = extract_claimed_role(req.text)

    # -------- SOURCES --------
    wiki = wikipedia_fact(main_entity)
    news = gnews_fact(req.text)
    wikidata = get_wikidata_id(main_entity) if main_entity else None

    sources: List[str] = []
    explanation: Optional[str] = None
    verdict = "UNVERIFIED"

    ml_score = 0
    ml_label = "UNKNOWN"

    ai_result = {
        "verdict": "UNVERIFIED",
        "credibility_score": 50,
        "credibility_label": "SKIPPED",
        "red_flags": []
    }

    # -------------------------------------------------
    # DECISION ENGINE
    # -------------------------------------------------

    if claim_type == "OPINION":
        verdict = "OPINION"
        explanation = "Opinions cannot be fact-checked."

    elif claim_type == "PREDICTION":
        verdict = "UNVERIFIED"
        explanation = "Predictions cannot be verified until the event occurs."

    elif claim_type == "FACT":

        # -------- ML --------
        ml_score, ml_label = analyze_with_ml(req.text)

        # -------- AI (SAFE + TIMEOUT) --------
        try:
            ai_result = await asyncio.wait_for(
                asyncio.to_thread(analyze_with_ai, req.text),
                timeout=8
            )

            if not isinstance(ai_result, dict):
                raise ValueError("Invalid AI response")

        except Exception as e:
            print("⚠️ AI skipped:", e)

        contradiction_reason = contradiction(
            claimed_role,
            wiki["description"] if wiki else ""
        )

        if contradiction_reason:
            verdict = "FALSE"
            explanation = contradiction_reason
            if wiki:
                sources.append(wiki["url"])

        else:
            score = 0
            reasons = []

            # ML
            if ml_label == "Real":
                score += 2
                reasons.append(f"ML model predicts the claim as real ({ml_score}%).")
            else:
                score -= 2
                reasons.append(f"ML model predicts the claim as fake ({ml_score}%).")

            # AI
            if ai_result["verdict"] == "TRUE":
                score += 2
                reasons.append("AI fact-checking found the claim credible.")
            else:
                score -= 1
                reasons.append("AI fact-checking could not fully verify the claim.")

            # Wikipedia
            if wiki:
                score += 2
                reasons.append("Wikipedia provides supporting information.")
                sources.append(wiki["url"])

            # News
            if news:
                score += 1
                reasons.append("News sources mention related information.")
                sources.extend(news)

            if score >= 3:
                verdict = "TRUE"
            elif score <= -3:
                verdict = "FALSE"
            else:
                verdict = "UNVERIFIED"

            explanation = " ".join(reasons)

    else:
        verdict = "UNVERIFIED"
        explanation = "This claim could not be confidently classified."

    # -------------------------------------------------
    # CONFIDENCE
    # -------------------------------------------------

    base_score, breakdown = confidence_breakdown(wiki, news, explanation)

    final_score = int(
        (base_score * 0.4)
        + (ml_score * 0.3 if claim_type == "FACT" else 0)
        + (ai_result["credibility_score"] * 0.3 if claim_type == "FACT" else 0)
    )

    final_score = min(max(final_score, 0), 100)

    breakdown.update({
        "ml_prediction": f"{ml_label} ({ml_score}%)" if claim_type == "FACT" else None,
        "ai_verdict": ai_result["credibility_label"] if claim_type == "FACT" else None,
        "ai_red_flags": ai_result["red_flags"] if claim_type == "FACT" else []
    })

    ranked_sources = rank_sources(sources)

    highlighted = (
        highlight_incorrect_phrase(req.text, claimed_role.title())
        if verdict == "FALSE" and claimed_role
        else None
    )

    result = AnalysisResult(
        input_text=req.text,
        claim_type=claim_type,
        final_label=verdict,
        final_score=final_score,
        explanation=explanation,
        highlighted_text=highlighted,
        confidence_breakdown=breakdown,
        wikidata_id=wikidata["id"] if isinstance(wikidata, dict) else None,
        ranked_sources=ranked_sources
    )

    # -------- SAFE DB INSERT --------
    try:
        await analyses.insert_one(result.model_dump())
    except Exception as e:
        print("⚠️ Mongo insert failed:", e)

    return result


# -------------------------------------------------
# FETCH ANALYSIS
# -------------------------------------------------

@router.get("/{analysis_id}", response_model=AnalysisResult)
async def get_analysis(analysis_id: str):

    doc = await analyses.find_one({"id": analysis_id}, {"_id": 0})

    if not doc:
        raise HTTPException(404, "Analysis not found")

    if isinstance(doc.get("timestamp"), str):
        doc["timestamp"] = datetime.fromisoformat(doc["timestamp"])

    return doc
