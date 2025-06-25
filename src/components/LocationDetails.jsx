import React from 'react';

const LocationDetails = ({ location, phase }) => {
  if (!location) {
    return (
      <div className="z-20 w-full text-white text-right">
        <p className="text-sm">No location selected</p>
      </div>
    );
  }

  const isLightPhase = phase === 'day' || phase === 'sunrise' || phase === 'sunset';

  return (
    <div className={`z-20 w-full ${isLightPhase ? 'text-black' : 'text-white'} text-right`}>
      <div className={`glassmorphism ${isLightPhase ? 'dark-glassmorphism' : ''} rounded-lg p-3`}>
        <h2 className="text-lg font-semibold">{location.name}</h2>
        <p className="text-sm">{`${location.region}, ${location.country}`}</p>
        <p className="text-sm">Local Time: {location.localtime}</p>
      </div>
    </div>
  );
};

export default LocationDetails;
