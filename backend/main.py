import os
import urllib.error
import urllib.request

from fastapi import FastAPI, HTTPException

app = FastAPI()

QDRANT_URL = os.getenv("QDRANT_URL", "http://qdrant:6333")


@app.get("/health/live")
def live():
    return {"api": "ok"}


@app.get("/health/ready")
def ready():
    try:
        with urllib.request.urlopen(
            f"{QDRANT_URL}/collections", timeout=3
        ):
            pass
    except (urllib.error.URLError, TimeoutError):
        raise HTTPException(
            status_code=503,
            detail="Qdrant unavailable",
        ) from None

    return {"api": "ok", "qdrant": "ok"}