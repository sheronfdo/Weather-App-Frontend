import './App.css';
import CurrentWeatherTiles from './components/CurrentWeatherTiles';
import WeatherBackgroundAnimation from './components/WeatherBackgroundAnimation';
import WeatherSearch from './components/WeatherSearch';
import { useState } from 'react';
import axios from 'axios';

function App() {
  const [weatherData, setWeatherData] = useState(null);

  const handleSearch = async (location) => {
    try {
      console.log('Searching for weather data for:', location);
      const response = await axios.get('http://localhost:3000/api/current', {
        params: { q: location }
      });
      console.log('Weather data:', response.data);
      setWeatherData(response.data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
      setWeatherData(null);
    }
  };

  return (
    <div className="relative min-h-screen">
      <WeatherSearch onSearch={handleSearch} />
      <WeatherBackgroundAnimation 
      condition={weatherData?.current?.condition?.text || 'patchy light rain with thunder'}
      />
      <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <CurrentWeatherTiles weatherData={weatherData} />
      </div>
    </div>
  );
}

export default App;