import datetime
import asyncio
import numpy as np
from fastapi import WebSocket
from app.schemas.price_schemas import PriceData
from app.utils.simulation_utils import round_by_spread

dt = 1 / 252
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

            new_price = round_by_spread(new_price, spread)

            price_data = PriceData(
                asset=asset,
                bid=round_by_spread(new_price - spread, spread),
                ask=round_by_spread(new_price + spread, spread),
                last=new_price,
                timestamp=datetime.datetime.utcnow().isoformat()
            )

            await websocket.send_json({
                "asset": asset,
                "data": price_data.dict()
            })
            
            last_prices[asset] = new_price

        await asyncio.sleep(0.2)
