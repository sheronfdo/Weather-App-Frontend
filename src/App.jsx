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

      const today =  new Date(currentResponse.data?.location?.localtime);
      // const locationDate = today.toISOString().split('T')[0]; 
      console.log('Current date for historical data:', today);
      const historicalDates = [];
      for (let i = 2; i > 0; i--) {
        const date = new Date(today);
        date.setDate(today.getDate() - i);
        console.log('fetching date:', date);
        historicalDates.push(date.toDateString().split(' ').slice(1).join(' ')); // Format as "DD MMM"
      }

      console.log('Historical dates:', historicalDates);

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
      for (let i = 1; i <= 4; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() + i);
        forecastDates.push(date.toDateString().split(' ').slice(1).join(' '));
      }

      const forecastResponse = await axios.get('http://localhost:3000/api/forecast', {
        params: { q: locationName, days: 4 } 
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

  const getCurrentPhase = () => {
    if (!weatherData?.location?.localtime) return 'night';
    const [hours, minutes] = weatherData.location.localtime.split(' ')[1].split(':').map(Number);
    const totalMinutes = hours * 60 + minutes;
    if (totalMinutes >= 1080 || totalMinutes < 300) return 'night'; // 6 PM to 5 AM
    if (totalMinutes >= 300 && totalMinutes < 360) return 'sunrise'; // 5 AM to 6 AM
    if (totalMinutes >= 360 && totalMinutes < 1080) return 'day'; // 6 AM to 6 PM
    if (totalMinutes >= 1080 && totalMinutes < 1140) return 'sunset'; // 6 PM to 7 PM
    return 'night';
  };

  const currentPhase = getCurrentPhase();

  return (
    <div className="relative">
      <WeatherBackgroundAnimation weatherData={weatherData} />
      <div className="grid grid-cols-2 gap-6 w-full max-w-6xl mx-auto py-6 z-20">
        <WeatherSearch onSearch={handleSearch} phase={currentPhase} />
        <LocationDetails location={weatherData?.location} phase={currentPhase} />
      </div>
      <div className="flex items-center justify-center py-6 z-20">
        <CurrentWeatherTiles weatherData={weatherData} phase={currentPhase} />
      </div>
      <div className="w-full max-w-7xl mx-auto p-6 mt-6 z-20 relative">
        <WeatherTable historical={historicalData || []} forecast={forecastData || []} />
      </div>
    </div>
  );
}

export default App;