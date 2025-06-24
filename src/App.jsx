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
  const [isLoading, setIsLoading] = useState(true);

  const handleSearch = async (location) => {
    try {
      setIsLoading(true);
      console.log('Searching for weather data for:', location);

      // Ensure location is a string (e.g., "Colombo" or user input)
      const locationName = typeof location === 'string' ? location : 'Colombo';

      const currentResponse = await axios.get('http://localhost:3000/api/current', {
        params: { q: locationName }
      });
      console.log('Current weather data:', currentResponse.data);
      setWeatherData(currentResponse.data);

      // Fetch historical data for the past 7 days up to yesterday
      const today = new Date();
      const historicalDates = [];
      for (let i = 2; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(today.getDate() - i - 1); // -1 to exclude today (June 23, 2025, and earlier)
        historicalDates.push(date.toISOString().split('T')[0]); // Format as YYYY-MM-DD
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
          time: h.time.split(' ')[1], // Extract time (e.g., "14:00")
          temp: h.temp_c,
          condition: h.condition.text,
          precip: h.precip_mm,
          icon: h.condition.icon
        }))
      }));
      setHistoricalData(historicalDataArray);
    } catch (error) {
      console.error('Error fetching weather data:', error);
      setWeatherData(null);
      setHistoricalData(null);
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
            // Since historical API doesn't support lat/lon, fall back to a default location
            console.log(`Geolocation detected: ${latitude}, ${longitude}, using Colombo as fallback`);
            resolve('Colombo'); // Fallback to location name
          },
          (error) => {
            console.error('Geolocation error:', error);
            resolve('Colombo'); // Default to Colombo on error
          }
        );
      } else {
        console.error('Geolocation is not supported by this browser.');
        resolve('Colombo'); // Default to Colombo if geolocation unsupported
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
      <div className="w-full max-w-5xl mx-auto p-4 mt-10 z-20 relative">
        <WeatherTable historical={historicalData || []} forecast={[]} />
      </div>
    </div>
  );
}

export default App;