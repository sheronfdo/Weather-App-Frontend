import './App.css';
import CurrentWeatherTiles from './components/CurrentWeatherTiles';
import WeatherBackgroundAnimation from './components/WeatherBackgroundAnimation';
import WeatherSearch from './components/WeatherSearch';
import { useState, useEffect } from 'react';
import axios from 'axios';
import LocationDetails from './components/LocationDetails';

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

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
      setIsLoading(true); 
      const defaultLocation = await getUserLocation();
      await handleSearch(defaultLocation); 
      setIsLoading(false); 
    };
    fetchDefaultWeather();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen">
      <WeatherBackgroundAnimation
        condition={weatherData?.current?.condition?.text}
      />
      <div className="grid grid-cols-2 gap-4 w-full max-w-5xl mx-auto m-10 z-20 relative">
        <WeatherSearch onSearch={handleSearch} />
        <LocationDetails location={weatherData?.location} />
      </div>
      <div className="flex items-center justify-center relative overflow-hidden">
        <CurrentWeatherTiles weatherData={weatherData} />
      </div>
    </div>
  );
}

export default App;