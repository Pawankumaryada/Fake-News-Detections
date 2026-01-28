from fastapi import APIRouter
from datetime import datetime, timezone
import uuid

router = APIRouter(prefix="/facts", tags=["Facts"])

@router.get("")
async def get_facts():
    return [
        {
            "id": str(uuid.uuid4()),
            "title": "Tesla Stock Analysis Q4 2024",
            "summary": "Comprehensive analysis of Tesla stock performance",
            "analysisType": "stock",
            "confidence": 94,
            "status": "verified",
            "risk": "low",
            "timestamp": datetime.now(timezone.utc).isoformat()
        }
    ]
