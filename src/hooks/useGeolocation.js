import { useState, useEffect, useRef } from 'react';

const useGeolocation = () => {
  const [location, setLocation] = useState(null);
  const [geoError, setGeoError] = useState(null);
  const [geoLoading, setGeoLoading] = useState(false);

  const getLocation = () => {
    if (!navigator.geolocation) {
      setGeoError('Geolocation is not supported by your browser.');
      return;
    }
    setGeoLoading(true);
    setGeoError(null);

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocation({ lat: pos.coords.latitude, lon: pos.coords.longitude });
        setGeoLoading(false);
      },
      (err) => {
        setGeoError('Unable to retrieve your location. Please allow location access.');
        setGeoLoading(false);
      },
      { timeout: 10000 }
    );
  };

  return { location, geoError, geoLoading, getLocation };
};

export default useGeolocation;
