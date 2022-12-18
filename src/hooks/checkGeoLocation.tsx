import { useEffect, useState } from "react";

const checkGeoLocation = () => {
  const [status, setStatus] = useState(String);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
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

  return status;
};

export default checkGeoLocation;
