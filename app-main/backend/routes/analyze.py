import uuid
import requests
from bs4 import BeautifulSoup
from datetime import datetime, timezone
from typing import List, Optional

from fastapi import APIRouter, HTTPException   # ✅ FIX HERE
from pydantic import BaseModel, Field, ConfigDict

from core.ml import analyze_with_ml
from core.ai import analyze_with_ai
from core.database import analyses

router = APIRouter(prefix="/analyze", tags=["Analyze"])


class AnalysisResult(BaseModel):
    model_config = ConfigDict(extra="ignore")

    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    input_text: str
    input_url: Optional[str] = None

    ml_score: int
    ml_label: str
    ai_score: int
    ai_label: str

    final_score: int
    final_label: str

    bias_analysis: str
    source_verification: str
    fact_check_summary: str
    key_claims: List[str]
    red_flags: List[str]

    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class TextRequest(BaseModel):
    text: str


def normalize_ai_score(ai: dict) -> int:
    score = ai.get("credibility_score", 0)
    verdict = ai.get("verdict", "FALSE")

    if verdict == "TRUE" and score < 60:
        return 80
    if verdict == "FALSE" and score > 40:
        return 20
    return score


def combine_scores(ml: int, ai: int):
    final = int((ml * 0.4) + (ai * 0.6))
    if final >= 85:
        return final, "TRUE"
    if final >= 60:
        return final, "LIKELY TRUE"
    if final >= 40:
        return final, "UNCERTAIN"
    return final, "FALSE"


@router.post("/text", response_model=AnalysisResult)
async def analyze_text(req: TextRequest):
    if len(req.text.strip()) < 5:
        raise HTTPException(400, "Minimum 5 characters required")

    ml_score, ml_label = analyze_with_ml(req.text)
    ai = await analyze_with_ai(req.text) or {}
    ai_score = normalize_ai_score(ai)

    final_score, final_label = combine_scores(ml_score, ai_score)

    result = AnalysisResult(
        input_text=req.text,
        ml_score=ml_score,
        ml_label=ml_label,
        ai_score=ai_score,
        ai_label=ai.get("credibility_label", "Unknown"),
        final_score=final_score,
        final_label=final_label,
        bias_analysis=ai.get("bias_analysis", "Unavailable"),
        source_verification=ai.get("source_verification", "Unavailable"),
        fact_check_summary=ai.get("fact_check_summary", "Unavailable"),
        key_claims=ai.get("key_claims", []),
        red_flags=ai.get("red_flags", []),
    )

    doc = result.model_dump()
    doc["timestamp"] = doc["timestamp"].isoformat()
    await analyses.insert_one(doc)

    return result


@router.get("/{analysis_id}", response_model=AnalysisResult)
async def get_analysis(analysis_id: str):
    doc = await analyses.find_one({"id": analysis_id}, {"_id": 0})
    if not doc:
        raise HTTPException(404, "Not found")

    doc["timestamp"] = datetime.fromisoformat(doc["timestamp"])
    return doc
