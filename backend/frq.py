from fastapi import APIRouter
import pandas as pd

router = APIRouter()

df = pd.read_csv("backend/frqs.csv")


@router.get("/frq/{ap}")
def get_frq(ap: str):
    return df[df["ap"] == ap].to_dict(orient="records")