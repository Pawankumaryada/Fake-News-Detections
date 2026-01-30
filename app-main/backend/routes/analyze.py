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


# =================================================
# MODELS
# =================================================

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


# =================================================
# HELPERS
# =================================================

def classify_claim_type(text: str) -> str:
    t = text.lower()

    if any(w in t for w in ["i think", "i believe", "in my opinion", "should"]):
        return "OPINION"

    if any(w in t for w in ["will", "may", "expected", "likely", "forecast"]):
        return "PREDICTION"

    if any(w in t for w in [" is ", " was ", " are ", " has been "]):
        return "FACT"

    return "UNKNOWN"


def extract_claimed_role(text: str) -> Optional[str]:
    roles = [
        "cricketer",
        "actor",
        "politician",
        "prime minister",
        "chief minister",
        "president",
        "governor",
    ]

    t = text.lower()
    for role in roles:
        if role in t:
            return role
    return None


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
            "url": data.get("content_urls", {}).get("desktop", {}).get("page"),
        }
    except Exception:
        return None


def gnews_fact(query: str):
    if not GNEWS_API_KEY:
        return []

    try:
        res = requests.get(
            "https://gnews.io/api/v4/search",
            params={
                "q": query,
                "token": GNEWS_API_KEY,
                "lang": "en",
                "max": 3,
            },
            timeout=5,
        )

        if res.status_code != 200:
            return []

        return [a["url"] for a in res.json().get("articles", [])]
    except Exception:
        return []


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


# =================================================
# ANALYZE ENDPOINT
# =================================================

@router.post("/text", response_model=AnalysisResult)
async def analyze_text(req: TextRequest):
    # 1. Validate
    if len(req.text.strip()) < 5:
        raise HTTPException(400, "Text too short")

    # 2. Run ML
    ml_score, ml_label = analyze_with_ml(req.text)

    # 3. Build response
    result = AnalysisResult(
        input_text=req.text,
        claim_type="FACT",
        final_label="TRUE",
        final_score=ml_score,
        explanation="ML model analysis completed",
        confidence_breakdown={},
        ranked_sources=[]
    )

    # 4. Save to Mongo
    await analyses.insert_one(result.model_dump())

    return result


    # ---------------- CLASSIFICATION ----------------
    claim_type = classify_claim_type(req.text)

    # ---------------- ENTITY EXTRACTION (FIXED) ----------------
    entities = extract_entities(req.text)
    main_entity = entities[0][0] if entities else None

    claimed_role = extract_claimed_role(req.text)

    wiki = wikipedia_fact(main_entity) if main_entity else None
    news = gnews_fact(req.text)
    wikidata = get_wikidata_id(main_entity) if main_entity else None

    # ---------------- DECISION ENGINE ----------------
    if claim_type == "OPINION":
        verdict = "OPINION"
        explanation = "Opinions cannot be fact-checked."

    elif claim_type == "PREDICTION":
        verdict = "UNVERIFIED"
        explanation = "Predictions cannot be verified until the event occurs."

    elif claim_type == "FACT":

        # ML (safe)
        try:
            ml_score, ml_label = analyze_with_ml(req.text)
        except Exception as e:
            print("⚠️ ML failed:", e)

        # AI (timeout-safe)
        try:
            ai_result = await asyncio.wait_for(
                asyncio.to_thread(analyze_with_ai, req.text),
                timeout=8,
            )
        except Exception as e:
            print("⚠️ AI skipped:", e)

        contradiction_reason = contradiction(
            claimed_role,
            wiki["description"] if wiki else "",
        )

        if contradiction_reason:
            verdict = "FALSE"
            explanation = contradiction_reason
            if wiki:
                sources.append(wiki["url"])
        else:
            score = 0
            reasons = []

            score += 2 if ml_label == "Real" else -2
            reasons.append(f"ML: {ml_label} ({ml_score}%)")

            score += 2 if ai_result.get("verdict") == "TRUE" else -1
            reasons.append("AI analysis completed")

            if wiki:
                score += 2
                sources.append(wiki["url"])
                reasons.append("Wikipedia supports context")

            if news:
                score += 1
                sources.extend(news)
                reasons.append("News sources found")

            verdict = "TRUE" if score >= 3 else "FALSE" if score <= -3 else "UNVERIFIED"
            explanation = " | ".join(reasons)

    # ---------------- CONFIDENCE ----------------
    base_score, breakdown = confidence_breakdown(wiki, news, explanation)

    final_score = int(
        base_score * 0.4
        + (ml_score * 0.3 if claim_type == "FACT" else 0)
        + (ai_result.get("credibility_score", 50) * 0.3 if claim_type == "FACT" else 0)
    )

    final_score = min(max(final_score, 0), 100)

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
        ranked_sources=rank_sources(sources),
    )

    # ---------------- DB INSERT (SAFE) ----------------
    try:
        await analyses.insert_one(result.model_dump())
    except Exception as e:
        print("⚠️ Mongo insert failed:", e)

    return result


# =================================================
# FETCH ANALYSIS
# =================================================

@router.get("/{analysis_id}", response_model=AnalysisResult)
async def get_analysis(analysis_id: str):

    doc = await analyses.find_one({"id": analysis_id}, {"_id": 0})

    if not doc:
        raise HTTPException(status_code=404, detail="Analysis not found")

    if isinstance(doc.get("timestamp"), str):
        doc["timestamp"] = datetime.fromisoformat(doc["timestamp"])

    return doc
