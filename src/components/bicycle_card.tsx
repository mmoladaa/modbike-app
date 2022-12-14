import React, {
  useState,
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
  Button,
  Flex,
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
    <div className="">
      <Flex w="100vw" h="100vh" overflowY="scroll">
      {bicycleData?.map((bicycleMap) => (
        <div className=" flex-nowrap">
        <Card key={bicycleMap.bicycle_ID} variant="filled" m={4} w={256}> 
          <CardHeader>
            <Heading as="h4" size="md">
              {bicycleMap.bicycle_ID}
            </Heading>
          </CardHeader>
          <CardBody>
            <Text>{bicycleMap.status}</Text>
          </CardBody>
          <CardFooter>
            <Button>Book</Button>
          </CardFooter>
        </Card>
        </div>
      ))}
      </Flex>
    </div>
  );
};

export default Bicycle_data;
