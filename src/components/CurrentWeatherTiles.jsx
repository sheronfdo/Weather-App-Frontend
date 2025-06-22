import React from 'react';

const CurrentWeatherTiles = ({ weatherData }) => {
  // Fallback data or loading state when weatherData is not available
  if (!weatherData || !weatherData.current) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-[2fr_4fr] gap-4 w-full max-w-5xl mx-auto">
        <div className="glassmorphism rounded-lg p-6 relative z-10 text-white h-[300px] flex items-center justify-center">
          <p className="text-xl">Enter a location to see the weather</p>
        </div>
        <div className="grid grid-cols-4 gap-2 h-[300px]"></div>
      </div>
    );
  }

  const { current, location } = weatherData;

  // Prepare metric icons using dynamic data
  const metricIcons = [
    { label: 'Feels Like', value: `${current.feelslike_c}°C`, icon: '//cdn.weatherapi.com/weather/64x64/night/176.png' },
    { label: 'Precipitation', value: `${current.precip_mm} mm`, icon: '//cdn.weatherapi.com/weather/64x64/night/176.png' },
    { label: 'Humidity', value: `${current.humidity}%`, icon: '//cdn.weatherapi.com/weather/64x64/day/266.png' },
    { label: 'Wind', value: `${current.wind_kph} kph ${current.wind_dir}`, icon: '//cdn.weatherapi.com/weather/64x64/day/143.png' },
    { label: 'Pressure', value: `${current.pressure_mb} mb`, icon: '//cdn.weatherapi.com/weather/64x64/day/119.png' },
    { label: 'Visibility', value: `${current.vis_km} km`, icon: '//cdn.weatherapi.com/weather/64x64/day/248.png' },
    { label: 'UV Index', value: current.uv, icon: '//cdn.weatherapi.com/weather/64x64/day/113.png' },
    { label: 'Wind Gust', value: `${current.gust_kph} kph`, icon: '//cdn.weatherapi.com/weather/64x64/day/143.png' },
    { label: 'Cloud Cover', value: `${current.cloud}%`, icon: '//cdn.weatherapi.com/weather/64x64/day/119.png' },
    { label: 'Dew Point', value: `${current.dewpoint_c}°C`, icon: '//cdn.weatherapi.com/weather/64x64/day/266.png' },
    { label: 'Wind Chill', value: `${current.windchill_c}°C`, icon: '//cdn.weatherapi.com/weather/64x64/day/143.png' },
    { label: 'Heat Index', value: `${current.heatindex_c}°C`, icon: '//cdn.weatherapi.com/weather/64x64/day/119.png' }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-[2fr_4fr] gap-4 w-full max-w-5xl mx-auto">
      {/* Larger first tile (weather summary) */}
      <div className="glassmorphism rounded-lg p-6 relative z-10 text-white h-[300px]">
        <h2 className="text-xl font-bold mb-2">{location.name} Weather</h2>
        <p className="text-sm mb-4">{current.last_updated}</p>
        <div className="flex items-center h-full">
          <img src={current.condition.icon} alt="Weather icon" className="w-24 h-24 mr-6 weather-icon" />
          <div className="flex-1">
            <p className="text-4xl font-semibold">{current.temp_c}°C</p>
            <p className="text-xl">{current.condition.text}</p>
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