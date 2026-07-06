from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from backend.quiz import router as quiz_router
from backend.frq import router as frq_router
from backend.subjects import router as subjects_router
from backend.auth import router as auth_router

app = FastAPI()

# ✅ THIS FIXES YOUR ERROR
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(quiz_router)
app.include_router(frq_router)
app.include_router(subjects_router)
app.include_router(auth_router)

@app.get("/")
def home():
    return {"message": "Quiz backend is running"}