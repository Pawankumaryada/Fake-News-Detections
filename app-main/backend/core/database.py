import os
from motor.motor_asyncio import AsyncIOMotorClient
from urllib.parse import quote_plus

# Read env vars
RAW_USERNAME = os.getenv("MONGO_USERNAME")
RAW_PASSWORD = os.getenv("MONGO_PASSWORD")
CLUSTER = os.getenv("MONGO_CLUSTER")
DB_NAME = os.getenv("MONGO_DB", "veritas")

if not all([RAW_USERNAME, RAW_PASSWORD, CLUSTER]):
    raise RuntimeError("MongoDB environment variables missing")

# RFC-3986 safe encoding
USERNAME = quote_plus(RAW_USERNAME)
PASSWORD = quote_plus(RAW_PASSWORD)

MONGO_URL = (
    f"mongodb+srv://{USERNAME}:{PASSWORD}"
    f"@{CLUSTER}/{DB_NAME}?retryWrites=true&w=majority"
)

print("✅ Mongo URL built (credentials hidden)")

client = AsyncIOMotorClient(MONGO_URL)
db = client[DB_NAME]

analyses = db["analyses"]
