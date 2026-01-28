import joblib
import pandas as pd
from sklearn.metrics import precision_recall_fscore_support
from pathlib import Path

BASE = Path(__file__).parent
model = joblib.load(BASE / "fake_news_model.pkl")
vectorizer = joblib.load(BASE / "vectorizer.pkl")

df = pd.read_csv(BASE / "dataset.csv")  # must contain text,label (1=REAL,0=FAKE)

X = vectorizer.transform(df["text"])
probs = model.predict_proba(X)[:, 1]  # REAL probability
y = df["label"]

for t in [0.5, 0.6, 0.65, 0.7, 0.75]:
    preds = (probs >= t).astype(int)
    p, r, f, _ = precision_recall_fscore_support(y, preds, average="binary")
    print(f"Threshold {t:.2f} | Precision {p:.2f} | Recall {r:.2f} | F1 {f:.2f}")
