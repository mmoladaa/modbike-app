import React, {
  useState,
  useMemo,
  useCallback,
  useRef,
  useEffect,
} from "react";
import axios from "axios";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Heading,
  Text,
} from "@chakra-ui/react";

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
      {bicycleData?.map((bicycleMap) => (
        <Card key={bicycleMap.bicycle_ID}>
          <CardHeader>
            <Heading as="h4" size="md">
              {bicycleMap.bicycle_ID}
            </Heading>
          </CardHeader>
          <CardBody>
            <Text>{bicycleMap.status}</Text>
          </CardBody>
          <CardFooter></CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default Bicycle_data;
