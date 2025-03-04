import BooksPage from './pages/Books';
import PlotsPage from './pages/Plots';

function App() {
  return (
    <div className="p-4 flex flex-col items-center text-center">
      <h1 className="text-3xl font-bold mb-4">Timeseries Dashboard</h1>
      <BooksPage />
      <PlotsPage />
    </div>
  );  
};

export default App;
