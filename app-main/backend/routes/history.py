from fastapi import APIRouter, HTTPException
from backend.core.database import analyses

router = APIRouter(prefix="/history", tags=["History"])

@router.get("/{email}")
async def get_user_history(email: str):
    results = await analyses.find(
        {"user_email": email},
        {"_id": 0}
    ).sort("timestamp", -1).to_list(50)

    return results
