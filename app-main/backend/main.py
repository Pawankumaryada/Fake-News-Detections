from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

# -------------------------------------------------
# ROUTERS (SAFE IMPORTS)
# -------------------------------------------------

from backend.routes.analyze import router as analyze_router

optional_routers = []

try:
    from backend.routes.auth import router as auth_router
    optional_routers.append(auth_router)
except Exception as e:
    print("⚠️ auth router disabled:", e)

try:
    from backend.routes.trending import router as trending_router
    optional_routers.append(trending_router)
except Exception as e:
    print("⚠️ trending router disabled:", e)

try:
    from backend.routes.admin import router as admin_router
    optional_routers.append(admin_router)
except Exception as e:
    print("⚠️ admin router disabled:", e)

try:
    from backend.routes.history import router as history_router
    optional_routers.append(history_router)
except Exception as e:
    print("⚠️ history router disabled:", e)

try:
    from backend.routes.feedback import router as feedback_router
    optional_routers.append(feedback_router)
except Exception as e:
    print("⚠️ feedback router disabled:", e)

try:
    from backend.routes.facts import router as facts_router
    optional_routers.append(facts_router)
except Exception as e:
    print("⚠️ facts router disabled:", e)


# -------------------------------------------------
# APP INIT
# -------------------------------------------------

app = FastAPI(
    title="Veritas AI Backend",
    version="1.0.0"
)


# -------------------------------------------------
# GLOBAL ERROR HANDLER (PREVENT BLANK 500s)
# -------------------------------------------------

@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    print("🔥 UNHANDLED ERROR:", exc)
    return JSONResponse(
        status_code=500,
        content={
            "error": "Internal Server Error",
            "message": "Unexpected server error occurred"
        }
    )


# -------------------------------------------------
# CORS (🔥 FIXED – VERY IMPORTANT)
# -------------------------------------------------

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",

        # OLD VERCEL
        "https://fake-news-detections-iota.vercel.app",

        # ✅ CURRENT VERCEL (from your screenshot)
        "https://fake-news-detections-mn3srsw4j-pawankumaryadas-projects.vercel.app",

        # FUTURE-SAFE (optional)
        "https://fake-news-detections.vercel.app",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# -------------------------------------------------
# ROUTES
# -------------------------------------------------

app.include_router(analyze_router, prefix="/api")

for router in optional_routers:
    app.include_router(router, prefix="/api")


# -------------------------------------------------
# HEALTH CHECK
# -------------------------------------------------

@app.get("/api/health")
def health():
    return {"status": "OK"}
