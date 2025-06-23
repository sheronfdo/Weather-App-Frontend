import './App.css';
import CurrentWeatherTiles from './components/CurrentWeatherTiles';
import WeatherBackgroundAnimation from './components/WeatherBackgroundAnimation';
import WeatherSearch from './components/WeatherSearch';
import { useState, useEffect } from 'react';
import axios from 'axios';
import LocationDetails from './components/LocationDetails';

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

  const getUserLocation = () => {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            resolve(`${latitude},${longitude}`);
          },
          (error) => {
            console.error('Geolocation error:', error);
            resolve('Colombo'); 
          }
        );
      } else {
        console.error('Geolocation is not supported by this browser.');
        resolve('Colombo');
      }
    });
  };

  useEffect(() => {
    const fetchDefaultWeather = async () => {
      const defaultLocation = await getUserLocation();
      handleSearch(defaultLocation);
    };
    fetchDefaultWeather();
  }, []);

  return (
    <div className="relative min-h-screen">
      <WeatherSearch onSearch={handleSearch} />
      <LocationDetails location={weatherData?.location} />
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