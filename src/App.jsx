import './App.css';
import CurrentWeatherTiles from './components/CurrentWeatherTiles';
import WeatherBackgroundAnimation from './components/WeatherBackgroundAnimation';
import WeatherSearch from './components/WeatherSearch';
import { useState, useEffect } from 'react';
import axios from 'axios';
import LocationDetails from './components/LocationDetails';
import WeatherTable from './components/WeatherTable';

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [historicalData, setHistoricalData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const handleSearch = async (location) => {
    try {
      setIsLoading(true);
      console.log('Searching for weather data for:', location);

      const locationName = typeof location === 'string' ? location : 'Colombo';

      const currentResponse = await axios.get('http://localhost:3000/api/current', {
        params: { q: locationName }
      });
      console.log('Current weather data:', currentResponse.data);
      setWeatherData(currentResponse.data);

      const today = new Date();
      const historicalDates = [];
      for (let i = 1; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(today.getDate() - i); 
        historicalDates.push(date.toISOString().split('T')[0]); 
      }
      const historicalPromises = historicalDates.map(date =>
        axios.get('http://localhost:3000/api/history', {
          params: { q: locationName, dt: date }
        })
      );
      const historicalResponses = await Promise.all(historicalPromises);
      const historicalDataArray = historicalResponses.map(response => ({
        date: response.data.forecast.forecastday[0].date,
        hourly: response.data.forecast.forecastday[0].hour.map(h => ({
          time: h.time.split(' ')[1], 
          temp: h.temp_c,
          condition: h.condition.text,
          precip: h.precip_mm,
          icon: h.condition.icon
        }))
      }));
      setHistoricalData(historicalDataArray);

      const forecastDates = [];
      for (let i = 1; i <= 3; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() + i); 
        forecastDates.push(date.toISOString().split('T')[0]); 
      }
      const forecastResponse = await axios.get('http://localhost:3000/api/forecast', {
        params: { q: locationName, days: 3 } 
      });
      const forecastDataArray = forecastResponse.data.forecast.forecastday.map(day => ({
        date: day.date,
        hourly: day.hour.map(h => ({
          time: h.time.split(' ')[1], 
          temp: h.temp_c,
          condition: h.condition.text,
          precip: h.precip_mm,
          icon: h.condition.icon
        }))
      }));
      setForecastData(forecastDataArray);
    } catch (error) {
      console.error('Error fetching weather data:', error);
      setWeatherData(null);
      setHistoricalData(null);
      setForecastData(null);
    } finally {
      setIsLoading(false);
    }
  };

  const getUserLocation = () => {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            console.log(`Geolocation detected: ${latitude}, ${longitude}, using Colombo as fallback`);
            resolve('Colombo'); 
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
    <div className="relative">
      <WeatherBackgroundAnimation
        condition={weatherData?.current?.condition?.text}
      />
      <div className="grid grid-cols-2 gap-6 w-full max-w-6xl mx-auto py-6 z-20">
        <WeatherSearch onSearch={handleSearch} />
        <LocationDetails location={weatherData?.location} />
      </div>
      <div className="flex items-center justify-center py-6 z-20">
        <CurrentWeatherTiles weatherData={weatherData} />
      </div>
      <div className="w-full max-w-7xl mx-auto p-6 mt-6 z-20 relative">
        <WeatherTable historical={historicalData || []} forecast={forecastData || []} />
      </div>
    </div>
  );
}

export default App;