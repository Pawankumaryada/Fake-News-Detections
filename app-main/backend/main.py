from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routes.analyze import router as analyze_router
from routes.auth import router as auth_router
from routes.trending import router as trending_router
from routes.admin import router as admin_router
from routes.history import router as history_router


app = FastAPI(
    title="Veritas AI Backend",
    version="0.1.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(analyze_router, prefix="/api")
app.include_router(auth_router, prefix="/api")
app.include_router(trending_router, prefix="/api")
app.include_router(admin_router, prefix="/api")
app.include_router(history_router, prefix="/api")
