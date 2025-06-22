import React from 'react';

const CurrentWeatherTiles = () => {
  // Current weather data updated for 12:43 AM IST (June 23, 2025) converted to London time (UTC)
  const data = {
    last_updated_epoch: 1750704580, // 12:43 AM IST (UTC+0530) - 5.5 hours = 7:13 PM UTC, June 22, 2025
    last_updated: '2025-06-22 19:13',
    temp_c: 19.6,
    temp_f: 67.3,
    is_day: 0,
    condition: {
      text: 'Clear',
      icon: '//cdn.weatherapi.com/weather/64x64/night/113.png',
      code: 1000
    },
    wind_mph: 7.9,
    wind_kph: 12.7,
    wind_degree: 265,
    wind_dir: 'W',
    pressure_mb: 1012.0,
    pressure_in: 29.88,
    precip_mm: 0.0,
    precip_in: 0.0,
    humidity: 72,
    cloud: 20,
    feelslike_c: 18.8,
    feelslike_f: 65.8,
    windchill_c: 18.3,
    windchill_f: 64.9,
    heatindex_c: 18.3,
    heatindex_f: 64.9,
    dewpoint_c: 13.0,
    dewpoint_f: 55.4,
    vis_km: 10.0,
    vis_miles: 6.0,
    uv: 0.0,
    gust_mph: 10.5,
    gust_kph: 16.9
  };

  const metricIcons = [
    { label: 'Feels Like', value: `${data.feelslike_c}°C`, icon: '//cdn.weatherapi.com/weather/64x64/night/176.png' },
    { label: 'Precipitation', value: `${data.precip_mm} mm`, icon: '//cdn.weatherapi.com/weather/64x64/night/176.png' },
    { label: 'Humidity', value: `${data.humidity}%`, icon: '//cdn.weatherapi.com/weather/64x64/day/266.png' },
    { label: 'Wind', value: `${data.wind_kph} kph ${data.wind_dir}`, icon: '//cdn.weatherapi.com/weather/64x64/day/143.png' },
    { label: 'Pressure', value: `${data.pressure_mb} mb`, icon: '//cdn.weatherapi.com/weather/64x64/day/119.png' },
    { label: 'Visibility', value: `${data.vis_km} km`, icon: '//cdn.weatherapi.com/weather/64x64/day/248.png' },
    { label: 'UV Index', value: data.uv, icon: '//cdn.weatherapi.com/weather/64x64/day/113.png' },
    { label: 'Wind Gust', value: `${data.gust_kph} kph`, icon: '//cdn.weatherapi.com/weather/64x64/day/143.png' },
    { label: 'Cloud Cover', value: `${data.cloud}%`, icon: '//cdn.weatherapi.com/weather/64x64/day/119.png' },
    { label: 'Dew Point', value: `${data.dewpoint_c}°C`, icon: '//cdn.weatherapi.com/weather/64x64/day/266.png' },
    { label: 'Wind Chill', value: `${data.windchill_c}°C`, icon: '//cdn.weatherapi.com/weather/64x64/day/143.png' },
    { label: 'Heat Index', value: `${data.heatindex_c}°C`, icon: '//cdn.weatherapi.com/weather/64x64/day/119.png' }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-[2fr_4fr] gap-4 w-full max-w-5xl mx-auto">
      {/* Larger first tile (weather summary) */}
      <div className="glassmorphism rounded-lg p-6 relative z-10 text-white h-[300px]">
        <h2 className="text-xl font-bold mb-2">Current Weather</h2>
        <p className="text-sm mb-4">{data.last_updated}</p>
        <div className="flex items-center h-full">
          <img src={data.condition.icon} alt="Weather icon" className="w-24 h-24 mr-6 weather-icon" />
          <div className="flex-1">
            <p className="text-4xl font-semibold">{data.temp_c}°C</p>
            <p className="text-xl">{data.condition.text}</p>
          </div>
        </div>
      </div>
      {/* Tile group with same height as the larger tile, arranged as 4x3 grid */}
      <div className="grid grid-cols-4 gap-2 h-[300px]">
        {metricIcons.map((item, index) => (
          <div key={index} className="glassmorphism rounded-lg p-2 relative z-10 text-white text-center flex items-center justify-center">
            <img src={item.icon} alt={`${item.label} icon`} className="w-6 h-6 mr-2" />
            <div>
              <p className="text-xs">{item.label}</p>
              <p className="text-sm font-medium">{item.value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CurrentWeatherTiles;