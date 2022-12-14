import Map from "../components/Map";
import Bicycle_card from "../components/bicycle_card";
import { Flex } from "@chakra-ui/react";

const Home = () => {
  return (
    <div>
      <div className="">
          <div className="z-0">
            <Map/>
          </div>
          <div className="z-50 left-8 top-8">
            <Bicycle_card />
          </div>
      </div>
    </div>
  );
};

export default Home;
