import joblib
import os

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
MODEL_PATH = os.path.join(BASE_DIR, "models", "fake_news_model.joblib")

if not os.path.exists(MODEL_PATH):
    raise RuntimeError("ML model file missing")

model = joblib.load(MODEL_PATH)

def analyze_with_ml(text: str):
    try:
        proba = model.predict_proba([text])[0]
        score = int(max(proba) * 100)
        label = "Real" if proba[1] > proba[0] else "Fake"
        return score, label
    except Exception as e:
        print("⚠️ ML DISABLED:", e)
        return 50, "UNKNOWN"
