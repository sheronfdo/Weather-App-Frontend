import './App.css';
import CurrentWeatherTiles from './components/CurrentWeatherTiles';

function App() {
  return (
    <div className="relative min-h-screen">
      <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <CurrentWeatherTiles />
      </div>
    </div>
  );
}

export default App;