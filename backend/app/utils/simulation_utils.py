from decimal import Decimal

def round_by_spread(value: float, spread: float) -> float:
    try:
        decimals = abs(Decimal(str(spread)).as_tuple().exponent)
        if decimals > 2: print(decimals)
        return round(value, decimals)
    except Exception as e:
        return value