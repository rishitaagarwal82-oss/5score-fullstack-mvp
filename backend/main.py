print("🔥 MAIN.PY IS RUNNING")

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

import backend.quiz as quiz
import backend.frq as frq

app = FastAPI()

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

# register routers safely
app.include_router(quiz.router)
app.include_router(frq.router)

@app.get("/")
def home():
    return {"message": "Quiz backend is running"}