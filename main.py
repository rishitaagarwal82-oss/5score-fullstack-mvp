from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from quiz import router as quiz_router
from frq import router as frq_router

print("🔥 MAIN.PY IS RUNNING")

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(quiz_router)
app.include_router(frq_router)


@app.get("/")
def home():
    return {"message": "Quiz backend is running"}
