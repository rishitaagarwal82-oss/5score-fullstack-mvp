from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os

from backend.quiz import router as quiz_router
from backend.frq import router as frq_router
from backend.subjects import router as subjects_router
from backend.routes.auth import router as auth_router

app = FastAPI()

# ✅ Robust CORS handling for smooth local development & cloud deployment
allowed_origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]

env_origins = os.getenv("ALLOWED_ORIGINS")
if env_origins:
    allowed_origins.extend([o.strip() for o in env_origins.split(",")])
    allow_creds = True
else:
    # Fallback to wildcard for effortless deployment if no custom origins are configured
    allowed_origins = ["*"]
    allow_creds = False

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=allow_creds,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router)
app.include_router(quiz_router)
app.include_router(frq_router)
app.include_router(subjects_router)

@app.get("/")
def home():
    return {"message": "Quiz backend is running"}
