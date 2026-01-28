import joblib
import pandas as pd
from sklearn.metrics import classification_report, confusion_matrix
from pathlib import Path

BASE = Path(__file__).parent
model = joblib.load(BASE / "fake_news_model.pkl")
vectorizer = joblib.load(BASE / "vectorizer.pkl")

df = pd.read_csv(BASE / "dataset.csv")

X = vectorizer.transform(df["text"])
y = df["label"]

preds = model.predict(X)

print("Confusion Matrix:")
print(confusion_matrix(y, preds))

print("\nClassification Report:")
print(classification_report(y, preds, target_names=["FAKE", "REAL"]))
