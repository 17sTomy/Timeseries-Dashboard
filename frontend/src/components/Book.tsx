type BookProps = {
  name: string;
  data?: { bid: number; ask: number; last: number; timestamp: string };
};

const Book: React.FC<BookProps> = ({ name, data }) => {
  return (
    <div className="p-4 rounded-lg shadow-md text-center flex flex-col items-center justify-center">
      <h2 className="text-xl font-bold">{name}</h2>
      <p className="text-gray-600">
        {data?.timestamp
          ? new Date(data.timestamp).toISOString().replace("T", " ").slice(0, 23)
          : "Waiting for data..."}
      </p>
      <div className="flex justify-center gap-4 text-lg">
        <span>Bid: {data?.bid}</span>
        <span>Last: {data?.last}</span>
        <span>Ask: {data?.ask}</span>
      </div>
    </div>
  );
};

export default Book;