import React from 'react';

const LocationDetails = ({ location }) => {
  if (!location) {
    return (
      <div className="z-20 w-full text-white">
        <p className="text-sm">No location selected</p>
      </div>
    );
  }

  return (
    <div className="z-20 w-full text-white">
      <div className="glassmorphism rounded-lg p-3">
        <h2 className="text-lg font-semibold">{location.name}</h2>
        <p className="text-sm">{`${location.region}, ${location.country}`}</p>
        <p className="text-sm">Local Time: {location.localtime}</p>
      </div>
    </div>
  );
};

export default LocationDetails;