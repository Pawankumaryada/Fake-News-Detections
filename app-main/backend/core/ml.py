import joblib
import os

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
MODEL_PATH = os.path.join(BASE_DIR, "models", "fake_news_model.joblib")

if not os.path.exists(MODEL_PATH):
    raise RuntimeError("ML model file missing")

model = joblib.load(MODEL_PATH)

def analyze_with_ml(text: str):
    """
    Returns:
    - confidence score (0–100)
    - label ("Real" or "Fake")
    """
    proba = model.predict_proba([text])[0]
    prediction = model.predict([text])[0]

    confidence = int(max(proba) * 100)
    label = "Fake" if prediction == 1 else "Real"

    return confidence, label
