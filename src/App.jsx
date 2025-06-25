import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { getCurrentWeather, getForecast, getHistory } from './api/weatherAPI';
import { CurrentWeatherTiles, LocationDetails, WeatherBackgroundAnimation, WeatherSearch, WeatherTable } from './components';
import Loader from './components/common/Loader';
import { getPhaseFromLocalTime } from './utils/weatherUtils';

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

      const currentResponse = await getCurrentWeather(locationName);
      console.log('Current weather data:', currentResponse.data);
      setWeatherData(currentResponse.data);

      const today = new Date(currentResponse.data?.location?.localtime);
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

      const historicalPromises = historicalDates.map(date => getHistory(locationName, date)
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

      const forecastResponse = await getForecast(locationName, 4);
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
    return <Loader />;
  }


  const currentPhase = getPhaseFromLocalTime(weatherData?.location?.localtime);

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