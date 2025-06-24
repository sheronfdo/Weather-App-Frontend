import React from 'react';

const WeatherBackgroundAnimation = ({ weatherData }) => {
  console.log('Weather data:', weatherData);

  // Get current time from weatherData.location.localtime
  const getCurrentTime = () => {
    if (weatherData?.location?.localtime) {
      const [date, time] = weatherData.location.localtime.split(' ');
      return time; // e.g., "03:14"
    }
    return '00:00'; // Fallback to midnight if no data
  };

  const currentTime = getCurrentTime();
  const [hours, minutes] = currentTime.split(':').map(Number);
  const totalMinutes = hours * 60 + minutes;

  // Define time phases (in minutes since midnight)
  const isNight = totalMinutes >= 1080 || totalMinutes < 300; // 6 PM (1080) to 5 AM (300)
  const isSunrise = totalMinutes >= 300 && totalMinutes < 360; // 5 AM to 6 AM
  const isDay = totalMinutes >= 360 && totalMinutes < 1080; // 6 AM to 6 PM
  const isSunset = totalMinutes >= 1080 && totalMinutes < 1140; // 6 PM to 7 PM

  const timeClass = isNight ? 'night-animation' :
                   isSunrise ? 'sunrise-animation' :
                   isDay ? 'day-animation' :
                   isSunset ? 'sunset-animation' : 'night-animation'; // Default to night if outside ranges

  return (
    <div className={`fixed inset-0 z-0 overflow-hidden ${timeClass}`}>
      {/* Night base elements (Moon on left) */}
      {isNight && (
        <>
          <div className="night-sky absolute inset-0"></div>
          <div className="moon absolute h-20 w-20 bg-gray-200 rounded-full opacity-70" style={{ top: '30%', left: '10%', transform: 'translateX(-50%)' }}></div>
          <div className="stars absolute w-full h-full">
            {[...Array(20)].map((_, i) => (
              <div key={i} className="star absolute bg-white opacity-60" style={{ animationDelay: `${Math.random() * 5}s` }} />
            ))}
          </div>
        </>
      )}

      {/* Sunrise base elements (Sun on right, Moon fading out) */}
      {isSunrise && (
        <>
          <div className="sunrise-sky absolute inset-0"></div>
          <div className="sun absolute h-20 w-20 bg-yellow-300 rounded-full opacity-80" style={{ top: '70%', right: '10%', transform: 'translateY(-50%)' }}></div>
          <div className="moon absolute h-20 w-20 bg-gray-200 rounded-full opacity-20" style={{ top: '30%', left: '10%', transform: 'translateX(-50%)', transition: 'opacity 5s' }}></div>
        </>
      )}

      {/* Day base elements (Sun on right) */}
      {isDay && (
        <>
          <div className="day-sky absolute inset-0"></div>
          <div className="sun absolute h-20 w-20 bg-yellow-300 rounded-full opacity-90" style={{ top: '40%', right: '15%', transform: 'translateY(-50%)' }}></div>
        </>
      )}

      {/* Sunset base elements (Sun on right, Moon fading in) */}
      {isSunset && (
        <>
          <div className="sunset-sky absolute inset-0"></div>
          <div className="sun absolute h-20 w-20 bg-yellow-400 rounded-full opacity-70" style={{ top: '70%', right: '10%', transform: 'translateY(-50%)' }}></div>
          <div className="moon absolute h-20 w-20 bg-gray-200 rounded-full opacity-30" style={{ top: '30%', left: '10%', transform: 'translateX(-50%)', transition: 'opacity 5s' }}></div>
        </>
      )}
    </div>
  );
};

export default WeatherBackgroundAnimation;