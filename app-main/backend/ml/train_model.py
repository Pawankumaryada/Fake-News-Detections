import pandas as pd
import joblib
import re
from pathlib import Path

from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score

# ---------------- PATHS ----------------
BASE_DIR = Path(__file__).resolve().parent.parent  # backend/
DATASET_PATH = BASE_DIR / "ml" / "dataset.csv"
MODEL_PATH = BASE_DIR / "ml" / "fake_news_model.pkl"
VECTORIZER_PATH = BASE_DIR / "ml" / "vectorizer.pkl"

# ---------------- CLEAN TEXT ----------------
def clean_text(text):
    text = str(text).lower()
    text = re.sub(r"http\S+", "", text)
    text = re.sub(r"[^a-z\s]", "", text)
    return text

# ---------------- LOAD DATA ----------------
df = pd.read_csv(DATASET_PATH)

df["text"] = df["text"].apply(clean_text)

X = df["text"]
y = df["label"]

# ---------------- TRAIN / TEST SPLIT ----------------
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42, stratify=y
)

# ---------------- VECTORIZER (FIXED) ----------------
vectorizer = TfidfVectorizer(
    stop_words="english",
    max_features=15000,
    min_df=1,        # ✅ FIX
    max_df=0.95,     # ✅ FIX
    ngram_range=(1, 2)
)

X_train_vec = vectorizer.fit_transform(X_train)
X_test_vec = vectorizer.transform(X_test)

# ---------------- MODEL ----------------
model = LogisticRegression(
    max_iter=1000,
    class_weight="balanced"
)

model.fit(X_train_vec, y_train)

# ---------------- EVALUATION ----------------
y_pred = model.predict(X_test_vec)
acc = accuracy_score(y_test, y_pred)

print(f"✅ Model trained successfully!")
print(f"📊 Accuracy: {acc * 100:.2f}%")

# ---------------- SAVE ----------------
joblib.dump(model, MODEL_PATH)
joblib.dump(vectorizer, VECTORIZER_PATH)

print("💾 Model saved to:", MODEL_PATH)
print("💾 Vectorizer saved to:", VECTORIZER_PATH)
