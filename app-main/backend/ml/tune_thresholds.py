import joblib
import pandas as pd
import numpy as np
from pathlib import Path
from sklearn.metrics import precision_recall_fscore_support

BASE_DIR = Path(__file__).parent

model = joblib.load(BASE_DIR / "fake_news_model.pkl")
vectorizer = joblib.load(BASE_DIR / "vectorizer.pkl")

# Dataset must contain columns: text, label
# label: 1 = REAL, 0 = FAKE
df = pd.read_csv(BASE_DIR / "dataset.csv")

X = vectorizer.transform(df["text"])
y_true = df["label"].values

probs_real = model.predict_proba(X)[:, 1]

print("\nThreshold | Precision | Recall | F1-score")
print("-" * 40)

best_f1 = 0
best_threshold = 0.5

for threshold in np.arange(0.55, 0.86, 0.05):
    y_pred = (probs_real >= threshold).astype(int)

    precision, recall, f1, _ = precision_recall_fscore_support(
        y_true, y_pred, average="binary", zero_division=0
    )

    print(f"{threshold:.2f}     | {precision:.2f}      | {recall:.2f}  | {f1:.2f}")

    if f1 > best_f1:
        best_f1 = f1
        best_threshold = threshold

print("\n✅ BEST THRESHOLD FOUND:")
print(f"Threshold = {best_threshold:.2f}, F1-score = {best_f1:.2f}")
