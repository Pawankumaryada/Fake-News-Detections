from fastapi import APIRouter, Depends
from auth.deps import get_current_user

router = APIRouter(prefix="/admin", tags=["Admin"])

@router.get("/stats")
def stats(user=Depends(get_current_user)):
    if user["role"] != "admin":
        return {"error": "Forbidden"}

    return {
        "users": 120,
        "analyses": 540,
        "ai_requests": 2140
    }
