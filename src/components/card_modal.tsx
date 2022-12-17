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
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  HStack,
  Icon,
} from "@chakra-ui/react";
type Props = {
  bikeID: string;
  status: string;
  lat: number;
  lng: number;
  userPos: LatLngLiteral;
};
import { useRef } from "react";
import axios from "axios";
import { useJsApiLoader } from "@react-google-maps/api";
import { useState } from "react";

type LatLngLiteral = google.maps.LatLngLiteral;
type DirectionsResult = google.maps.DirectionsResult;

const card_modal = ({ bikeID, status, lat, lng, userPos }: Props) => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: import.meta.env.VITE_REACT_APP_GOOGLE_MAPS_API_KEY!,
  });

  const [directionsResponse, setDirectionsResponse] =
    useState<DirectionsResult>();
  const [googleDistance, setGoogleDistance] = useState("");
  const [googleDuration, setGoogleDuration] = useState("");

  function calculateRoute(
    userPos: LatLngLiteral,
    destinationPos: LatLngLiteral
  ) {
    const service = new google.maps.DirectionsService();
    service.route(
      {
        origin: userPos,
        destination: destinationPos,
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === "OK" && result) {
          setDirectionsResponse(result);
          setGoogleDistance(result!.routes[0]!.legs[0]!.distance!.text);
          setGoogleDuration(result!.routes[0]!.legs[0]!.duration!.text);
          console.log(result);
        }
      }
    );
  }

  const { isOpen, onOpen, onClose } = useDisclosure();
  // const cancelRef = React.useRef()
  const cancelRef = useRef<HTMLButtonElement>(null);
  // const d: Date = new Date();
  const d = new Date();

  // var dt = "new Date().getTime();"
  const passstatus = () => {
    const url = "http://localhost:8888/test_post/index.php";
    let fData = new FormData();
    fData.append("bicycle_id", bikeID);
    fData.append("bicycle_status", "booked");
    fData.append(
      "time",
      d.toISOString().split("T")[0] + " " + d.toTimeString().split(" ")[0]
    );
    fData.append("user_id", "Kittipong");
    axios.post(url, fData).then((response) => alert(response.data));
    console.log(
      d.toISOString().split("T")[0] + " " + d.toTimeString().split(" ")[0]
    );
  };
  return isLoaded ? (
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
            shadow-3xl
          >
            <CardHeader>
              <HStack>
                <Icon
                  viewBox="0 0 200 200"
                  color="#FFFFFF"
                  stroke="#00CA5F"
                  stroke-width="40"
                  boxSize={6}
                >
                  <path
                    fill="currentColor"
                    d="M 100, 100 m -75, 0 a 75,75 0 1,0 150,0 a 75,75 0 1,0 -150,0"
                  />
                </Icon>
                <Heading as="h4" size="xs">
                  {status.toUpperCase()}
                </Heading>
              </HStack>
            </CardHeader>
            <CardBody>
              {/* <VStack> */}

              {/* <Text as='abbr' fontSize='md'>Bicycle ID</Text> */}
              <Text as="b" fontSize="3xl">
                {bikeID}
              </Text>
              <Text as="b" fontSize="xl">
                {googleDistance}
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
            <Text>do you want to use this bicycle?</Text>
            {/* <Button colorScheme='orange' onClick={passstatus}>book this bike</Button> */}
            <Button colorScheme="red" onClick={onOpen}>
              Delete Customer
            </Button>
            <AlertDialog
              isOpen={isOpen}
              leastDestructiveRef={cancelRef}
              onClose={onClose}
            >
              <AlertDialogOverlay>
                <AlertDialogContent>
                  <AlertDialogHeader fontSize="lg" fontWeight="bold">
                    Delete Customer
                  </AlertDialogHeader>

                  <AlertDialogBody>
                    Are you sure? You can't undo this action afterwards.
                  </AlertDialogBody>

                  <AlertDialogFooter>
                    <Button ref={cancelRef} onClick={onClose}>
                      Cancel
                    </Button>
                    <Button colorScheme="red" onClick={onClose} ml={3}>
                      Delete
                    </Button>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialogOverlay>
            </AlertDialog>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  ) : (
    <>LOADING</>
  );
};

export default card_modal;
