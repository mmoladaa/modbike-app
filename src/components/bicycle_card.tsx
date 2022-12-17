import React, {
  useState,
  useEffect,
} from "react";
import { Flex } from "@chakra-ui/react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import AVAILABLE from "./popup_avaliable";
import INUSE from "./popup_inuse";
import BOOKED from "./popup_booked";
import useGeoLocation from "../hooks/useGeoLocation";
const Bicycle_data = () => {
  const userLocation = useGeoLocation();
  var x = 0;
  const { user, isAuthenticated} = useAuth0();
  const [bicycleData, setBicycleData] = useState<
    {
      ID: string;
      bicycle_ID: string;
      status: string;
      time: string;
      username: string;
      lat: string;
      lng: string;
    }[]
  >();


   const fetchBicycleData = async () => {
    const resultAwait = await axios.get(
      "https://iot.encall.space/bicycle_data.php"
    );
    setBicycleData(resultAwait.data.bicycle_data);
    {
      useGeoLocation;
    }
  };
  useEffect(() => {
    fetchBicycleData();
    const interval = setInterval(() => {
      fetchBicycleData();
      {
        useGeoLocation;
      }
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <Flex
        w="100vw"
        h={{ base: "55vh", lg: "55vh", sm: "55vh", md: "55vh" }}
        overflowY="scroll"
      >

        {bicycleData?.map((bicycleMap) => (
          <div
            key={bicycleMap.bicycle_ID}
            className="bg-gradient-to-t from-[#A4DFFA]"
          >
            {bicycleMap.username == (user?.email) && (bicycleMap.status == "booked" )
              ? (React.createElement(BOOKED, {
                bikeID: bicycleMap.bicycle_ID,
                status: bicycleMap.status,
                username: user?.email,
                lat: parseFloat(bicycleMap.lat),
                lng: parseFloat(bicycleMap.lng),
                userPos: userLocation.position,
              })) : null}
            {bicycleMap.username == (user?.email) && (bicycleMap.status == "booked")
              ? (x = x + 1) : null}
            {bicycleMap.username == (user?.email) && (bicycleMap.status == "inuse" )
              ? (React.createElement(INUSE, {
                bikeID: bicycleMap.bicycle_ID,
                status: bicycleMap.status,
                username: user?.email,
                lat: parseFloat(bicycleMap.lat),
                lng: parseFloat(bicycleMap.lng),
                userPos: userLocation.position,
              })) : null}
            {bicycleMap.username == (user?.email) && (bicycleMap.status == "inuse")
              ? (x = x + 1) : null}

          </div>
        ))}
        <>
          {/* {console.log(x)} */}
        </>
        {x !=0  ?
          null : bicycleData?.map((bicycleMap) => (
            <div
              key={bicycleMap.bicycle_ID}
              className="bg-gradient-to-t from-[#A4DFFA]"
            >

              {bicycleMap.status == "available"
                ? React.createElement(AVAILABLE, {
                  bikeID: bicycleMap.bicycle_ID,
                  status: bicycleMap.status,
                  username: user!.email!,
                  lat: parseFloat(bicycleMap.lat),
                  lng: parseFloat(bicycleMap.lng),
                  userPos: userLocation.position,

                })
                : null}

            </div>
          ))}

      </Flex>
    </div>
  );
};

export default Bicycle_data;
