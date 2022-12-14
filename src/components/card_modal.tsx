import React from 'react'
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
  Flex,

} from "@chakra-ui/react";
type Props = {
  bikeID: string,
  status: string
}
import axios from 'axios';
// import { useState } from 'react';

// const [book, setBook] = useState();

const card_modal = ({ bikeID, status }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const d: Date = new Date();
  // var dt = "new Date().getTime();"
  const passstatus = () => {
    const url = "http://localhost:8888/test_post/index.php";
    let fData = new FormData();
    fData.append("bicycle_id", bikeID);
    fData.append("bicycle_status", "booked");
    fData.append("time",d.getTime().toString());
    fData.append("user_id", "Kittipong");
    axios.post(url, fData).then(response=>alert(response.data));
    console.log(fData);
  };
  return (
    <div>
      <div onClick={onOpen}>
      {/* <Flex w="100vw" h="60vh" overflowY="scroll"> */}
      <div className=" flex-nowrap">
        <Card variant="filled" m={4} w={256}>
          <CardHeader>
            <Heading as="h4" size="md">
              {bikeID}
            </Heading>
          </CardHeader>
          <CardBody>
            <Text>{status}</Text>
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
            <Button colorScheme='orange' onClick={passstatus}>book this bike</Button>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>

  )
}

export default card_modal


