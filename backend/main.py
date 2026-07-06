print("🔥 MAIN.PY IS RUNNING")

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# IMPORTANT: remove backend. for Render compatibility
from quiz import router as quiz_router
from frq import router as frq_router

app = FastAPI()

# ======================
# CORS (IMPORTANT)
# ======================
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "https://5score-fullstack-mvp-l23o.vercel.app",
        "https://5score-fullstack-mvp-2.onrender.com"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ======================
# ROUTES
# ======================
app.include_router(quiz_router)
app.include_router(frq_router)

# ======================
# HEALTH CHECK
# ======================
@app.get("/")
def home():
    return {"message": "Quiz backend is running"}