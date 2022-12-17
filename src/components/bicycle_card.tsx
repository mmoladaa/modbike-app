import React, { useState, useEffect } from "react";
import { Flex } from "@chakra-ui/react";
import axios from "axios";
import useGeoLocation from "../hooks/useGeoLocation";
import Card_modal from "./card_modal";

const Bicycle_data = () => {
  const userLocation = useGeoLocation();
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
        h={{ base: "55vh", lg: "52vh", md: "40vh" }}
        overflowY="scroll"
      >
        {bicycleData?.map((bicycleMap, index) => (
          <div
            key={bicycleMap.bicycle_ID}
            className="bg-gradient-to-t from-[#A4DFFA]"
          >
            {bicycleMap.status == "available"
              ? React.createElement(Card_modal, {
                  bikeID: bicycleMap.bicycle_ID,
                  status: bicycleMap.status,
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
