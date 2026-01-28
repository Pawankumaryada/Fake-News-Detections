import re
import joblib
from pathlib import Path
from backend.core.config import logger

ROOT_DIR = Path(__file__).resolve().parent.parent
ML_DIR = ROOT_DIR / "ml"

model = joblib.load(ML_DIR / "fake_news_model.pkl")
vectorizer = joblib.load(ML_DIR / "vectorizer.pkl")
logger.info("✅ ML model & vectorizer loaded")

def clean_text(text: str) -> str:
    text = text.lower()
    text = re.sub(r"http\S+", "", text)
    text = re.sub(r"[^a-z\s]", "", text)
    return text

def analyze_with_ml(text: str):
    vec = vectorizer.transform([clean_text(text)])
    prob_real = model.predict_proba(vec)[0][1]
    score = int(prob_real * 100)
    label = "Real" if score >= 50 else "Fake"
    return score, label
