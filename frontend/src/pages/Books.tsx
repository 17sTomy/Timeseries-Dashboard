import useWebSocket from '../hooks/useWebSocket';
import Book from '../components/Book';

const BooksPage: React.FC = () => {
  const WEBSOCKET_URL = import.meta.env.VITE_WEBSOCKET_URL;
  const data = useWebSocket(WEBSOCKET_URL);
  const ASSETS = ['WTI', 'SOY', 'YPF', 'SP500'];

  return (
    <div className="p-4 flex flex-col items-center text-center">
      <div className="grid grid-cols-2 gap-4 justify-center">
        {ASSETS.map((asset) => (
          <Book key={asset} name={asset} data={data[asset]} />
        ))}
      </div>
    </div>
  );
};

export default BooksPage;
