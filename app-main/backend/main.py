from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from backend.routes.analyze import router as analyze_router
from backend.routes.auth import router as auth_router
from backend.routes.trending import router as trending_router
from backend.routes.admin import router as admin_router
from backend.routes.history import router as history_router
from backend.routes.feedback import router as feedback_router
from backend.routes.facts import router as facts_router

app = FastAPI(
    title="Veritas AI Backend",
    version="1.0.0"
)

# ✅ CORS (LOCAL + VERCEL)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "https://fake-news-detections-iota.vercel.app"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ROUTES
app.include_router(analyze_router, prefix="/api")
app.include_router(auth_router, prefix="/api")
app.include_router(trending_router, prefix="/api")
app.include_router(admin_router, prefix="/api")
app.include_router(history_router, prefix="/api")
app.include_router(feedback_router, prefix="/api")
app.include_router(facts_router, prefix="/api")

@app.get("/api/health")
def health():
    return {"status": "OK"}
