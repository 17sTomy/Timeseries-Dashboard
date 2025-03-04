import React, { useState, useEffect } from 'react';
import useWebSocket from '../hooks/useWebSocket';
import Plot from '../components/Plot';

const PlotsPage: React.FC = () => {
  const WEBSOCKET_URL = import.meta.env.VITE_WEBSOCKET_URL;
  const data = useWebSocket(WEBSOCKET_URL);
  
  const ASSETS = ['WTI', 'SOY', 'YPF', 'SP500'];
  const [priceHistory, setPriceHistory] = useState<Record<string, { timestamp: number; price: number }[]>>({});

  useEffect(() => {
    ASSETS.forEach((asset) => {
      if (data[asset]) {
        setPriceHistory((prev) => ({
          ...prev,
          [asset]: [
            ...(prev[asset] || []), 
            { timestamp: Date.now(), price: data[asset].last }
          ].slice(-50),
        }));
      }
    });
  }, [data]);

  return (
    <div className="p-4 flex flex-col items-center text-center">
      <div className="flex flex-wrap gap-4 mt-4 justify-center">
        {ASSETS.map((asset) => (
          <Plot key={asset} name={asset} lastPrices={priceHistory[asset] || []} />
        ))}
      </div>
    </div>
  );
};

export default PlotsPage;