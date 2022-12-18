import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import React, {
  useState,
  useMemo,
  useCallback,
  useRef,
  useEffect,
} from "react";
import axios from "axios";
import useGeoLocation from "../hooks/useGeoLocation";

type MapOptions = google.maps.MapOptions;

const Map = () => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: import.meta.env.VITE_REACT_APP_GOOGLE_MAPS_API_KEY!,
  });

  const options = useMemo<MapOptions>(
    () => ({
      mapId: "65ffcf93cf012c75",
      streetViewControl: false,
      mapTypeControl: false,
      disableDefaultUI: true,
      gestureHandling: "greedy",
    }),
    []
  );

  const onLoad = useCallback((map: any) => (mapRef.current = map), []);

  const mapRef = useRef<GoogleMap>();

  const userLocation = useGeoLocation();

  const map: any = mapRef.current;

  const [markers, setMarkers] = useState<
    {
      node: string;
      bicycle_ID: string;
      status: string;
      time: string;
      username: string;
      lat: string;
      lng: string;
    }[]
  >();

  const fetchGPSData = async () => {
    const resultAwait = await axios.get(
      "https://iot.encall.space/bicycle_data.php"
    );
    setMarkers(resultAwait.data.bicycle_data);
  };
  {
    useGeoLocation;
  }
  useEffect(() => {
    fetchGPSData();
    const interval = setInterval(() => {
      {
        useGeoLocation;
      }
      fetchGPSData();
    }, 10000);
    return () => clearInterval(interval);
  }, []);
  return isLoaded ? (
    <div className="h-screen w-screen absolute">
      {/* {console.log(markers)} */}
      <GoogleMap
        mapContainerStyle={{ height: "100%", width: "100%" }}
        center={userLocation.position}
        zoom={18}
        options={options}
        onLoad={onLoad}
      >
        {markers?.map((marker) => {
          return marker.status == "available" ? (
            <Marker
              position={{
                lat: parseFloat(marker.lat),
                lng: parseFloat(marker.lng),
              }}
              key={parseFloat(marker.node)}
              icon={{
                url: "available.svg",
                scaledSize: new window.google.maps.Size(25, 25),
                origin: new window.google.maps.Point(0, 0),
                anchor: new window.google.maps.Point(10, 10),
              }}
              onClick={() => {
                alert("Bicycle ID: " + marker.bicycle_ID + "\nStatus: " + marker.status);
              }}
            />
          ) : marker.status == "inuse" ? (
            <Marker
              position={{
                lat: parseFloat(marker.lat),
                lng: parseFloat(marker.lng),
              }}
              key={parseFloat(marker.node)}
              icon={{
                url: "unavailable.svg",
                scaledSize: new window.google.maps.Size(25, 25),
                origin: new window.google.maps.Point(0, 0),
                anchor: new window.google.maps.Point(10, 10),
              }}
              onClick={() => {
                alert("Bicycle ID: " + marker.bicycle_ID + "\nStatus: " + marker.status);
              }}
            />
          ) : marker.status == "booked" ? (
            <Marker
              position={{
                lat: parseFloat(marker.lat),
                lng: parseFloat(marker.lng),
              }}
              key={parseFloat(marker.node)}
              icon={{
                url: "pending.svg",
                scaledSize: new window.google.maps.Size(25, 25),
                origin: new window.google.maps.Point(0, 0),
                anchor: new window.google.maps.Point(10, 10),
              }}
              onClick={() => {
                alert("Bicycle ID: " + marker.bicycle_ID + "\nStatus: " + marker.status);
              }}
            />
          ) : (
            <></>
          );
        })}

        <Marker
          position={userLocation.position}
          icon={{
            url: "user.svg",
            scaledSize: new window.google.maps.Size(40, 40),
            origin: new window.google.maps.Point(0, 0),
            anchor: new window.google.maps.Point(10, 10),
          }}
          onClick={() => {
            map.panTo({
              lat: userLocation.position.lat,
              lng: userLocation.position.lng,
            });
          }}
        />
      </GoogleMap>
      <div className="z-10 fixed bottom-60 right-0 pr-4 pb-4">
        <img
          src="reset.svg"
          onClick={() => {
            map.panTo({
              lat: userLocation.position.lat,
              lng: userLocation.position.lng,
            });
            map.setZoom(18);
          }}
        />
      </div>
    </div>
  ) : (
    <>abc</>
  );
};

export default React.memo(Map);
