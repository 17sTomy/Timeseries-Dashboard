from pydantic import BaseModel
from datetime import datetime

class PriceData(BaseModel):
    asset: str
    bid: float
    ask: float
    last: float
    timestamp: str
