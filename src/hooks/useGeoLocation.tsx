import { useEffect, useState } from "react";

const useGeoLocation = () => {
  const [userLocation, setUserLocation] = useState({
    position: { lat: 0, lng: 0},
  });
  const [status, setStatus] = useState(String);


  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            position: {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            },
          });
          setStatus("granted");
        },
        () => {
          setStatus("denied");
        }
      );
    } else {
      setStatus("not supported");
    }
  }, []);

  return userLocation;
};

export default useGeoLocation;
