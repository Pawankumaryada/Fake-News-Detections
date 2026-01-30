from motor.motor_asyncio import AsyncIOMotorClient
import os
from urllib.parse import quote_plus

MONGO_USERNAME = os.getenv("MONGO_USERNAME")
MONGO_PASSWORD = os.getenv("MONGO_PASSWORD")
MONGO_CLUSTER = os.getenv("MONGO_CLUSTER")
MONGO_DB = os.getenv("MONGO_DB", "veritas_db")

if not all([MONGO_USERNAME, MONGO_PASSWORD, MONGO_CLUSTER]):
    raise RuntimeError("❌ MongoDB environment variables not set")

# Encode credentials safely
username = quote_plus(MONGO_USERNAME)
password = quote_plus(MONGO_PASSWORD)

MONGO_URL = (
    f"mongodb+srv://{username}:{password}@{MONGO_CLUSTER}/"
    f"{MONGO_DB}?retryWrites=true&w=majority"
)

print("✅ Mongo URL built (credentials hidden)")

client = AsyncIOMotorClient(MONGO_URL)
db = client[MONGO_DB]

# ✅ COLLECTIONS (THIS WAS MISSING)
analyses = db["analyses"]
users = db["users"]
feedback = db["feedback"]
history = db["history"]
