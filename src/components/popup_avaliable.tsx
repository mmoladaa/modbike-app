import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Heading,
  Text,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  HStack,
  Icon,
} from "@chakra-ui/react";
import { useRef } from "react";
import axios from "axios";

type Props = {
  bikeID: string;
  status: string;
  username: string;
  lat: number;
  lng: number;
  userPos: LatLngLiteral;
};
type LatLngLiteral = google.maps.LatLngLiteral;
type DirectionsResult = google.maps.DirectionsResult;

const AVAILABLE = ({ bikeID, status,username}: Props) => {
    const d = new Date();
    const passstatus = () => {
        const url = "http://localhost:8888/test_post/index.php";
        let fData = new FormData();
        fData.append("bicycle_id", bikeID);
        fData.append("bicycle_status", "booked");
        fData.append(
          "time",
          d.toISOString().split("T")[0] + " " + d.toTimeString().split(" ")[0]
        );
        fData.append("user_id", username);
        axios.post(url, fData).then((response) => alert(response.data));
        console.log(
          d.toISOString().split("T")[0] + " " + d.toTimeString().split(" ")[0]
        );
      };
    const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <div>
        <link href="https://css.gg/shape-circle.css" rel="stylesheet"></link>
    <div onClick={onOpen}>
    <div className=" flex-nowrap ">
      <Card
        bg="white"
        variant="filled"
        m={4}
        w={200}
        borderRadius="20"
        shadow-3xl="true"
      >
        <CardHeader>
          <HStack>
            <Icon
              
              viewBox="0 0 200 200"
              color="#FFFFFF"
              stroke="#00EA52"
              strokeWidth="40"
              boxSize={6}
            >
              <path
                fill="currentColor"
                d="M 100, 100 m -75, 0 a 75,75 0 1,0 150,0 a 75,75 0 1,0 -150,0"
              />
            </Icon>
            <Heading as="h4" size="xs">
                {/* {username} */}
              {status.toUpperCase()}
            </Heading>
          </HStack>
        </CardHeader>
        <CardBody>
          <Text as="b" fontSize="3xl">
            {bikeID}
          </Text>
          {/* </VStack> */}
        </CardBody>
        <CardFooter></CardFooter>
      </Card>
    </div>
    {/* </Flex> */}
  </div>
  <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{bikeID}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>bicycle id {bikeID}</Text>
            <Text>status {status}</Text>
            <Text>do you want to book this bicycle?</Text>
            <Button colorScheme='green' onClick={passstatus}>book</Button>
            
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
</div>
  )
}

export default AVAILABLE
