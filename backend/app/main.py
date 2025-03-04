from fastapi import FastAPI
from app.routes.websockets_routes import router as websocket_router

app = FastAPI()

app.include_router(websocket_router)
