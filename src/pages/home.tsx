import Map from "../components/Map";
import Bicycle_card from "../components/bicycle_card";
import { Flex } from "@chakra-ui/react";

const Home = () => {
  return (
    <div>
      <div className="">
        <div className="z-0">
          <Map />
        </div>
          <div className="w-full h-0 fixed left-0 bottom-0
            flex justify-center items-center
            " >
            <Bicycle_card />
          
        </div>
      </div>
    </div>
  );
};

export default Home;
