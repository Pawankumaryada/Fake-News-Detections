from fastapi import APIRouter, Depends, HTTPException, status
from auth.deps import get_current_user

router = APIRouter(
    prefix="/admin",
    tags=["Admin"]
)

# -------------------------------
# Helper: Admin Role Check
# -------------------------------
def admin_only(user):
    if user.get("role") != "admin":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Admin access required"
        )


# -------------------------------
# Admin Dashboard Stats
# -------------------------------
@router.get("/stats")
def get_admin_stats(user=Depends(get_current_user)):
    admin_only(user)

    return {
        "status": "success",
        "data": {
            "total_users": 120,
            "total_analyses": 540,
            "ai_requests": 2140,
            "flagged_news": 67
        }
    }


# -------------------------------
# System Health Status
# -------------------------------
@router.get("/system-health")
def system_health(user=Depends(get_current_user)):
    admin_only(user)

    return {
        "ai_engine": "running",
        "api_status": "online",
        "database": "connected",
        "threat_monitor": "active"
    }


# -------------------------------
# Recent News Analysis (Mock)
# -------------------------------
@router.get("/recent-analyses")
def recent_analyses(user=Depends(get_current_user)):
    admin_only(user)

    return [
        {
            "title": "Government launches new AI regulation",
            "source": "Verified Media",
            "result": "REAL",
            "confidence": "92%"
        },
        {
            "title": "Miracle cure circulating on WhatsApp",
            "source": "Social Media",
            "result": "FAKE",
            "confidence": "88%"
        },
        {
            "title": "Market crash rumor spreads online",
            "source": "Blog",
            "result": "UNVERIFIED",
            "confidence": "64%"
        }
    ]
