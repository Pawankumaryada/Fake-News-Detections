import joblib
import os

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
MODEL_PATH = os.path.join(BASE_DIR, "models", "fake_news_model.joblib")

print("📦 Loading ML model...")

if not os.path.exists(MODEL_PATH):
    raise RuntimeError("❌ Model file not found")

model = joblib.load(MODEL_PATH)

print("✅ ML model loaded successfully")
