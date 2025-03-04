import { useEffect, useState } from 'react';

const useWebSocket = (url: string) => {
  const [data, setData] = useState<Record<string, any>>({});

  useEffect(() => {
    const socket = new WebSocket(url);

    socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      setData((prevData) => ({
        ...prevData,
        [message.asset]: message.data,
      }));
    };

    return () => socket.close();
  }, [url]);

  return data;
};

export default useWebSocket;