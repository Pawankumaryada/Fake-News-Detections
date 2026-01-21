from fastapi import APIRouter

router = APIRouter(prefix="/trending", tags=["Trending"])

@router.get("")
def trending():
    return [
        "Election misinformation",
        "Fake government schemes",
        "AI deepfake videos",
        "Viral WhatsApp forwards"
    ]
