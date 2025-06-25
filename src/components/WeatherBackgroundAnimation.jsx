import React from 'react';

const WeatherBackgroundAnimation = ({ weatherData }) => {
  console.log('Weather data:', weatherData);

  const getCurrentTime = () => {
    if (weatherData?.location?.localtime) {
      const [date, time] = weatherData.location.localtime.split(' ');
      return time;
    }
    return '00:00';
  };

  const currentTime = getCurrentTime();
  const [hours, minutes] = currentTime.split(':').map(Number);
  const totalMinutes = hours * 60 + minutes;

  const isNight = totalMinutes >= 1080 || totalMinutes < 300; // 7:00 PM to 5:00 AM
  const isSunrise = totalMinutes >= 300 && totalMinutes < 360; // 5:00 AM to 6:00 AM
  const isDay = totalMinutes >= 360 && totalMinutes < 1080; // 6:00 AM to 7:00 PM
  const isSunset = totalMinutes >= 1080 && totalMinutes < 1140; // 7:00 PM to 8:00 PM

  const timeClass = isNight ? 'night-animation' :
    isSunrise ? 'sunrise-animation' :
      isDay ? 'day-animation' :
        isSunset ? 'sunset-animation' : 'night-animation';

  const getWeatherAnimationType = (condition) => {
    if (!condition) return 'clear';
    const lowerCaseCondition = condition.toLowerCase();
    if (lowerCaseCondition.includes('rain') || lowerCaseCondition.includes('shower')) return 'rain';
    if (lowerCaseCondition.includes('snow')) return 'snow';
    if (lowerCaseCondition.includes('thunder') || lowerCaseCondition.includes('storm')) return 'thunder';
    if (lowerCaseCondition.includes('cloud') || lowerCaseCondition.includes('overcast') || lowerCaseCondition.includes('partly')) return 'cloudy';
    if (lowerCaseCondition.includes('wind') || lowerCaseCondition.includes('breezy')) return 'windy';
    if (lowerCaseCondition.includes('mist') || lowerCaseCondition.includes('fog')) return 'fog';
    if (lowerCaseCondition.includes('hail')) return 'hail';
    return 'clear';
  };

  const weatherCondition = weatherData?.current?.condition?.text || 'Clear';
  const animationType = getWeatherAnimationType(weatherCondition);
  // const animationType = getWeatherAnimationType('fog');

  return (
    <div className={`fixed inset-0 z-0 overflow-hidden ${timeClass}`}>
      {/* Time-based elements */}
      {isNight && (
        <>
          <div className="night-sky absolute inset-0"></div>
          <div className="moon absolute h-24 w-24 bg-gray-200 rounded-full opacity-75" style={{ top: '25%', left: '15%', boxShadow: '0 0 40px 15px rgba(211, 211, 211, 0.4)' }}></div>
          <div className="stars absolute w-full h-full">
            {[...Array(30)].map((_, i) => (
              <div key={i} className="star absolute bg-white" style={{
                width: `${Math.random() * 3 + 1}px`,
                height: `${Math.random() * 3 + 1}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 70}%`,
                opacity: `${Math.random() * 0.5 + 0.5}`,
                animation: `star-twinkle ${Math.random() * 5 + 3}s infinite alternate`
              }} />
            ))}
          </div>
        </>
      )}

      {isSunrise && (
        <>
          <div className="sunrise-sky absolute inset-0"></div>
          <div className="sun absolute h-20 w-20 bg-yellow-300 rounded-full opacity-80" style={{ top: '70%', right: '10%', transform: 'translateY(-50%)', boxShadow: '0 0 70px 20px rgba(255, 215, 0, 0.6)' }}></div>
        </>
      )}

      {isDay && (
        <>
          <div className="day-sky absolute inset-0"></div>
          <div className="sun absolute h-20 w-20 bg-yellow-300 rounded-full opacity-90" style={{ top: '40%', right: '15%', transform: 'translateY(-50%)', boxShadow: '0 0 80px 25px rgba(255, 215, 0, 0.7)' }}></div>
        </>
      )}

      {isSunset && (
        <>
          <div className="sunset-sky absolute inset-0"></div>
          <div className="sun absolute h-20 w-20 bg-yellow-400 rounded-full opacity-70" style={{ top: '70%', right: '10%', transform: 'translateY(-50%)', boxShadow: '0 0 60px 15px rgba(255, 69, 0, 0.5)' }}></div>
        </>
      )}

      {/* Weather-specific animations */}
      {animationType === 'rain' && (
        <div className="rain absolute inset-0">
          {[...Array(150)].map((_, i) => (
            <div key={i} className="raindrop absolute bg-blue-400" style={{
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 20 + 10}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * -50}vh`,
              animation: `rain-fall ${Math.random() * 0.5 + 0.5}s linear infinite`,
              transform: `rotate(${Math.random() * 30 - 15}deg) translateX(${Math.random() * 20 - 10}px)`
            }} />
          ))}
          <div className="rain-splash absolute bottom-0 w-full h-20 bg-blue-300 opacity-40" style={{ animation: 'splash-ripple 2s infinite' }}></div>
        </div>
      )}

      {animationType === 'snow' && (
        <div className="snow absolute inset-0">
          {[...Array(120)].map((_, i) => (
            <div key={i} className="snowflake absolute bg-white" style={{
              width: `${Math.random() * 8 + 2}px`,
              height: `${Math.random() * 8 + 2}px`,
              borderRadius: '50%',
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * -50}vh`,
              animation: `snow-fall ${Math.random() * 7 + 5}s ease-in-out infinite`,
              boxShadow: '0 0 10px 2px rgba(255, 255, 255, 0.3)'
            }} />
          ))}
        </div>
      )}

      {animationType === 'thunder' && (
        <div className="thunder absolute inset-0">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="lightning absolute h-0 w-0 border-l-[60px] border-l-transparent border-r-[60px] border-r-transparent border-b-[150px] border-b-white opacity-0" style={{
              top: `${15 + Math.random() * 30}%`,
              left: `${50 + Math.random() * 30 - 15}%`,
              transform: 'translateX(-50%)',
              animation: `lightning-strike ${Math.random() * 10 + 8}s infinite`
            }} />
          ))}
          {[...Array(8)].map((_, i) => (
            <div key={i} className="flash absolute bg-yellow-300 opacity-0" style={{
              top: `${15 + Math.random() * 30}%`,
              left: `${50 + Math.random() * 30 - 15}%`,
              width: `${Math.random() * 6 + 2}px`,
              height: `${100 + Math.random() * 80}px`,
              animation: `flash-blink ${Math.random() * 1.5 + 1}s infinite`
            }} />
          ))}
          <div className="thunder-rumble absolute inset-0 bg-gray-800 opacity-0" style={{ animation: 'rumble-pulse 4s infinite' }}></div>
        </div>
      )}

      {animationType === 'cloudy' && (
        <div className="clouds absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="cloud-cluster" style={{
              top: `${Math.random() * 50 + 10}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 20}s`,
              transform: `scale(${0.8 + Math.random() * 0.5})`,
              zIndex: i
            }}>
              {[...Array(5)].map((_, j) => (
                <div key={j} className="cloud-part" style={{
                  top: `${Math.random() * 20}px`,
                  left: `${j * 35 + Math.random() * 10}px`,
                  width: `${60 + Math.random() * 40}px`,
                  height: `${40 + Math.random() * 30}px`,
                  background: `radial-gradient(circle at center, rgba(255,255,255,0.9), rgba(230,230,230,0.7))`,
                  animationDelay: `${Math.random() * 10}s`,
                }} />
              ))}
            </div>
          ))}
        </div>
      )}


      {animationType === 'windy' && (
        <div className="wind absolute inset-0">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="wind-leaf absolute bg-green-700" style={{
              width: `${Math.random() * 18 + 6}px`,
              height: `${Math.random() * 25 + 6}px`,
              top: `${Math.random() * 60 + 10}%`,
              left: `${5 + i * 7}%`,
              animation: `wind-gust ${2 + Math.random() * 4}s ease-in-out infinite`,
              transform: `rotate(${Math.random() * 180 - 90}deg)`,
              borderRadius: '50%',
              boxShadow: '0 0 5px rgba(0, 100, 0, 0.3)'
            }} />
          ))}
          {[...Array(40)].map((_, i) => (
            <div key={i} className="wind-dust absolute bg-gray-500" style={{
              width: `${Math.random() * 6 + 2}px`,
              height: `${Math.random() * 6 + 2}px`,
              top: `${Math.random() * 70 + 10}%`,
              left: `${Math.random() * 100}%`,
              animation: `dust-gust ${Math.random() * 5 + 2}s ease-in-out infinite`,
              opacity: `${Math.random() * 0.6 + 0.2}`
            }} />
          ))}
        </div>
      )}

{animationType === 'fog' && (
  <div className="fog absolute inset-0 pointer-events-none z-10 overflow-hidden">
    {[...Array(4)].map((_, i) => (
      <div
        key={i}
        className="fog-texture"
        style={{
          top: `${i * 20 + 5}%`,
          left: `${Math.random() * 100 - 30}%`,
          animationDelay: `${Math.random() * 15}s`,
          animationDuration: `${60 + Math.random() * 30}s`,
          transform: `scale(${1.2 + Math.random() * 0.4})`,
          opacity: `${0.15 + Math.random() * 0.2}`,
          zIndex: 10 - i
        }}
      />
    ))}
    <div className="fog-ground" />
  </div>
)}



      {animationType === 'hail' && (
        <div className="hail absolute inset-0">
          {[...Array(150)].map((_, i) => (
            <div key={i} className="hailstone absolute bg-white" style={{
              width: `${Math.random() * 10 + 4}px`,
              height: `${Math.random() * 10 + 4}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * -50}vh`,
              animation: `hail-bounce ${Math.random() * 0.7 + 0.4}s linear infinite`,
              transform: `rotate(${Math.random() * 360}deg) translateX(${Math.random() * 30 - 15}px)`,
              boxShadow: '0 0 15px 3px rgba(255, 255, 255, 0.7)'
            }} />
          ))}
          {[...Array(20)].map((_, i) => (
            <div key={i} className="hail-impact absolute bg-white bg-opacity-20" style={{
              width: `${Math.random() * 20 + 10}px`,
              height: `${Math.random() * 20 + 10}px`,
              bottom: '0',
              left: `${Math.random() * 100}%`,
              animation: `impact-pulse ${Math.random() * 2 + 1}s infinite`,
              opacity: `${Math.random() * 0.3 + 0.2}`
            }} />
          ))}
        </div>
      )}

      {/* Default clear/sunny (no extra animation) */}
      {animationType === 'clear' && null}
    </div>
  );
};

export default WeatherBackgroundAnimation;