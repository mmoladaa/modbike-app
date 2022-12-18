import { useEffect } from "react";
import Map from "../components/Map";
import Bicycle_card from "../components/bicycle_card";
import checkGeoLocation from "../hooks/checkGeoLocation";
import DeniedComponent from "../components/deniedComponent";
import NotSupportedComponent from "../components/notSupportedComponent";
import LoadingSpinner from "../components/loadingSpinner";

const Home = () => {
  let locationPermissionStatus = checkGeoLocation();

  useEffect(() => {
    checkGeoLocation;
  }, []);
  return locationPermissionStatus === "granted" ? (
    <div>
      <div className="">
        <div className="z-0">
          <Map />
        </div>
        <div
          className="w-full h-0 fixed left-0 bottom-0
            flex justify-center items-center z-20
          "
        >
          <Bicycle_card />
        </div>
      </div>
      <div className="inset-x-0 bottom-0 fixed rounded-none w-full h-72 bg-gradient-to-t from-[#A4DFFA]"></div>
    </div>
  ) : locationPermissionStatus === "denied" ? (
    <div>
      <DeniedComponent />
    </div>
  ) : locationPermissionStatus === "not supported" ? (
    <div>
      <NotSupportedComponent />
    </div>
  ) : (
    <div>
      <LoadingSpinner />
    </div>
  );
};

export default Home;
