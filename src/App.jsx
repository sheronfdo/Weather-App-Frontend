import './App.css';
import CurrentWeatherTiles from './components/CurrentWeatherTiles';
import WeatherBackgroundAnimation from './components/WeatherBackgroundAnimation';

function App() {
  return (
    <div className="relative min-h-screen">
      <WeatherBackgroundAnimation condition="patchy light rain with thunder" />
      <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <CurrentWeatherTiles />
      </div>
    </div>
  );
}

export default App;