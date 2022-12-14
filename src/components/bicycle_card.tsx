import React, {
  useState,
  useMemo,
  useCallback,
  useRef,
  useEffect,
} from "react";
import {
  Flex,

} from "@chakra-ui/react";
import axios from "axios";

import Card_modal from "./card_modal";
// import cardM from "./components/bicycle_cards";
const Bicycle_data = () => {
  const [bicycleData, setBicycleData] = useState<{ ID: string; bicycle_ID: string; status: string }[]>();

  useEffect(() => {
    const fetchBicycleData = async () => {
      const resultAwait = await axios.get(
        "https://iot.encall.space/bicycle_data.php"
      );
      setBicycleData(resultAwait.data.bicycle_data);
    };
    fetchBicycleData();
    const interval = setInterval(() => {
      fetchBicycleData();
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    
    <div>
      <Flex w="100vw" h="60vh" overflowY="scroll"> 
      {bicycleData?.map((bicycleMap) => (

        <div key={bicycleMap.bicycle_ID} >
          {React.createElement(Card_modal, { bikeID: bicycleMap.bicycle_ID, status: bicycleMap.status })}
        </div>
      ))}
      </Flex> 
    </div>
  );
};

export default Bicycle_data;