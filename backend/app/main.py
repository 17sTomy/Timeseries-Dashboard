from fastapi import FastAPI, WebSocket
import asyncio
import numpy as np
import datetime

app = FastAPI()

dt = 1 / 252  # Representa un día hábil en un año
assets = {
    "WTI": {"mu": 6, "volatility": 47, "S0": 70.0, "spread": 0.1},
    "SOY": {"mu": 8, "volatility": 14, "S0": 995.0, "spread": 0.250},
    "YPF": {"mu": 16, "volatility": 46, "S0": 25.0, "spread": 0.5},
    "SP500": {"mu": 10, "volatility": 12, "S0": 5700, "spread": 5},
}

async def simulate_prices(websocket: WebSocket):
    await websocket.accept()
    last_prices = {k: v["S0"] for k, v in assets.items()}
    
    while True:
        for asset, params in assets.items():
            mu, volatility, spread = params["mu"] / 100, params["volatility"] / 100, params["spread"]
            epsilon = np.random.normal(0, 1)
            new_price = last_prices[asset] * (1 + mu * dt + volatility * np.sqrt(dt) * epsilon)
            
            spread_str = str(spread)
            if '.' in spread_str:
                decimal_places = len(spread_str.split(".")[1])
            else:
                decimal_places = 2 
                
            new_price = round(new_price, decimal_places)
            
            data = {
                "Bid": new_price - spread,
                "Ask": new_price + spread,
                "Last": new_price,
                "Timestamp": datetime.datetime.utcnow().strftime("%Y-%m-%d %H:%M:%S.%f")[:-3]
            }
            await websocket.send_json({"asset": asset, "data": data})
            last_prices[asset] = new_price
            
        await asyncio.sleep(0.2)


@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await simulate_prices(websocket)
