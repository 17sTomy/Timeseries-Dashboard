from fastapi import APIRouter, WebSocket
from app.services.simulation_service import simulate_prices

router = APIRouter()

@router.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await simulate_prices(websocket)