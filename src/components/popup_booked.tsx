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
import { useJsApiLoader } from "@react-google-maps/api";
import { useState } from "react";
function refreshPage() {
  window.location.reload();
}
const INUSE = ({ bikeID, status,username,lat, lng, userPos}: Props) => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: import.meta.env.VITE_REACT_APP_GOOGLE_MAPS_API_KEY!,
  });

  const [directionsResponse, setDirectionsResponse] =
    useState<DirectionsResult>();
  const [googleDistance, setGoogleDistance] = useState("");
  const [googleDuration, setGoogleDuration] = useState("");
  const [googleDistanceM, setGoogleDistanceM] = useState(Number);

  function calculateRoute(
    userPos: LatLngLiteral,
    destinationPos: LatLngLiteral
  ) {
    const service = new google.maps.DirectionsService();
    service.route(
      {
        origin: userPos,
        destination: destinationPos,
        travelMode: google.maps.TravelMode.WALKING,
      },
      (result, status) => {
        if (status === "OK" && result) {
          setDirectionsResponse(result);
          setGoogleDistance(result!.routes[0]!.legs[0]!.distance!.text);
          setGoogleDuration(result!.routes[0]!.legs[0]!.duration!.text);
          setGoogleDistanceM(result!.routes[0]!.legs[0]!.distance!.value);
        }
      }
    );
  }

  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef<HTMLButtonElement>(null);
    const d = new Date();
    const retrieve = () => {
      if(googleDistanceM<=150){
        const url = "https://iot.encall.space/edit_data.php";
        let fData = new FormData();
        fData.append("bicycle_id", bikeID);
        fData.append("bicycle_status", "inuse");
        fData.append(
          "time",
          d.toISOString().split("T")[0] + " " + d.toTimeString().split(" ")[0]
        );
        fData.append("user_id", username);
        axios.post(url, fData).then((response) => console.log(response.data));
        console.log(
          d.toISOString().split("T")[0] + " " + d.toTimeString().split(" ")[0]
        );
        alert("retrieving done");
        refreshPage();
        }else{
          alert("Too far away");
          refreshPage();
        }
      };
      const passstatus = () => {
        const url = "https://iot.encall.space/edit_data.php";
        let fData = new FormData();
        fData.append("bicycle_id", bikeID);
        fData.append("bicycle_status", "available");
        fData.append(
          "time",
          d.toISOString().split("T")[0] + " " + d.toTimeString().split(" ")[0]
        );
        fData.append("user_id", "0");
        axios.post(url, fData).then((response) => console.log(response.data));
        console.log(
          d.toISOString().split("T")[0] + " " + d.toTimeString().split(" ")[0]
        );
        alert("returning done");
        refreshPage();
        // onClose();
      };
  return (
    <div>
      <>
        {calculateRoute(userPos, {
          lat: lat,
          lng: lng,
        })}
      </>
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
              stroke="#F2E002"
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
              <Text as="b" fontSize="xl">
                <br />
                {googleDistanceM}metres
                <br />
                {googleDuration}
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
            <Text>do you want to retrieve this bicycle?</Text>
            <Button colorScheme='green' onClick={retrieve}>retrieve</Button>
            <Text>do you want to return this bicycle?</Text>
            <Button colorScheme='orange' onClick={passstatus}>return</Button>
            {/* <Button colorScheme='green' onClick={retrieve}>return</Button> */}
            
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

export default INUSE
