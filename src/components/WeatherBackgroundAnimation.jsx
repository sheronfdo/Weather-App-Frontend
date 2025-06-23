import React from 'react';

const WeatherBackgroundAnimation = ({ condition }) => {
  console.log('Weather condition:', condition);
  const getAnimationClass = (conditionText) => {
    switch (conditionText.toLowerCase()) {
      case 'patchy light rain with thunder':
      case 'moderate or heavy rain with thunder':
      case 'thundery outbreaks possible':
        return 'thunder-animation';
      case 'patchy light rain':
      case 'light rain':
      case 'moderate rain':
      case 'heavy rain':
        return 'rain-animation';
      case 'clear':
      case 'sunny':
        return 'clear-animation';
      case 'light snow':
      case 'moderate snow':
      case 'heavy snow':
        return 'snow-animation';
      case 'mist':
      case 'fog':
      case 'freezing fog':
        return 'fog-animation';
      default:
        return 'default-animation';
    }
  };

  const animationClass = getAnimationClass(condition);

  return (
    <div className={`fixed inset-0 z-0 overflow-hidden ${animationClass}`}>
      {/* Thunder animation elements */}
      <div className="thunder-sky absolute inset-0"></div>
      <div className="thunder-clouds absolute inset-0 bg-gray-800 opacity-70"></div>
      <div className="thunder-strike absolute h-1 w-1 bg-yellow-300 opacity-0"></div>
      <div className="thunder-strike-2 absolute h-1 w-1 bg-yellow-300 opacity-0"></div>
      {/* Rain animation elements */}
      <div className="rain-sky absolute inset-0"></div>
      <div className="rain-clouds absolute inset-0 bg-gray-700 opacity-60"></div>
      <div className="raindrops absolute w-full h-full">
        {[...Array(30)].map((_, i) => (
          <div key={i} className="raindrop absolute bg-blue-400 opacity-70" />
        ))}
      </div>
      {/* Snow animation elements */}
      <div className="snow-sky absolute inset-0"></div>
      <div className="snow-clouds absolute inset-0 bg-gray-600 opacity-50"></div>
      <div className="snowflakes absolute w-full h-full">
        {[...Array(20)].map((_, i) => (
          <div key={i} className="snowflake absolute bg-white opacity-80" />
        ))}
      </div>
      {/* Clear animation elements */}
      <div className="clear-sky absolute inset-0"></div>
      <div className="stars absolute w-full h-full">
        {[...Array(15)].map((_, i) => (
          <div key={i} className="star absolute bg-white opacity-70" />
        ))}
      </div>
      {/* Fog animation elements */}
      <div className="fog-sky absolute inset-0"></div>
      <div className="fog-layer absolute inset-0 bg-white opacity-30"></div>
    </div>
  );
};

export default WeatherBackgroundAnimation;