type BookProps = {
  name: string;
  data?: { Bid: number; Ask: number; Last: number; Timestamp: string };
};

const Book: React.FC<BookProps> = ({ name, data }) => {
  const formatNumber = (num?: number) => num?.toFixed(2) || "-";

  return (
    <div className="p-4 rounded-lg shadow-md text-center flex flex-col items-center justify-center">
      <h2 className="text-xl font-bold">{name}</h2>
      <p className="text-gray-600">{data?.Timestamp || "Waiting for data..."}</p>
      <div className="flex justify-center gap-4 text-lg">
        <span>Bid: {formatNumber(data?.Bid)}</span>
        <span>Last: {formatNumber(data?.Last)}</span>
        <span>Ask: {formatNumber(data?.Ask)}</span>
      </div>
    </div>
  );
};

export default Book;