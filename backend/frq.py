from fastapi import APIRouter
import pandas as pd

router = APIRouter()


@router.get("/frq/{ap}")
def get_frq(ap: str):
    try:
        df = pd.read_csv("backend/frqs.csv")
        return df[df["ap"] == ap].to_dict(orient="records")
    except Exception as e:
        print(f"Error loading FRQs: {e}")
        return []
