import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

type PlotProps = {
  name: string;
  lastPrices: { timestamp: number; price: number }[];
};

const Plot: React.FC<PlotProps> = ({ name, lastPrices }) => {
  const data = {
    labels: lastPrices.map((entry) => {
      const date = new Date(entry.timestamp);
      return date.toTimeString().split(" ")[0] + "." + date.getMilliseconds().toString().padStart(3, "0");
    }),    
    datasets: [
      {
        label: name,
        data: lastPrices.map((entry) => entry.price),
        fill: true,
        borderColor: "blue",
      },
    ],
  };

  const options = {
    responsive: false,
    maintainAspectRatio: false,
    scales: {
      x: { title: { display: true, text: 'Time' } } ,
      y: { title: { display: true, text: 'Price' } }
    }
  };

  return (
    <div className="p-4 flex flex-col items-center justify-center text-center">
      <h2 className="text-xl font-bold mb-2">{name} Price History</h2>
      <div className="flex justify-center items-center">
        <Line data={data} options={options} width={670} height={300} />
      </div>
    </div>
  );  
};


export default Plot;