import pandas as pd
from pathlib import Path

# Get correct base directory
BASE_DIR = Path(__file__).resolve().parent.parent  # backend/

# Correct file paths
fake_path = BASE_DIR / "Fake.csv"
true_path = BASE_DIR / "True.csv"

print("📂 Loading:", fake_path)
print("📂 Loading:", true_path)

# Load CSVs
fake = pd.read_csv(fake_path)
true = pd.read_csv(true_path)

# Add labels
fake["label"] = 0
true["label"] = 1

# Normalize column name
fake = fake.rename(columns={fake.columns[0]: "text"})
true = true.rename(columns={true.columns[0]: "text"})

# Combine
df = pd.concat([fake, true], ignore_index=True)
df = df.dropna().drop_duplicates()

# Save final dataset
output_path = BASE_DIR / "ml" / "dataset.csv"
df.to_csv(output_path, index=False)

print("✅ Dataset created:", output_path)
print("📊 Shape:", df.shape)
