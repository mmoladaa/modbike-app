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
  bikeID: string,
  status: string
}
import { useRef } from 'react';
import axios from 'axios';
// import { useState } from 'react';

// const [book, setBook] = useState();

const card_modal = ({ bikeID, status }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
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
    fData.append("time", d.toISOString().split('T')[0] + ' ' + d.toTimeString().split(' ')[0]);
    fData.append("user_id", "Kittipong");
    axios.post(url, fData).then(response => alert(response.data));
    console.log(d.toISOString().split('T')[0] + ' ' + d.toTimeString().split(' ')[0]);
  };
  return (
    <div>
      <link href='https://css.gg/shape-circle.css' rel='stylesheet'></link>
      <div onClick={onOpen}>
        <div className=" flex-nowrap" color="white">
          <Card variant="filled" m={4} w={256} borderRadius="20" shadow-2xl>
            <CardHeader>
              <HStack>
                <Icon viewBox='0 0 200 200' color='#00CA5F' boxSize={6}>
                  <path
                    fill='currentColor'
                    d='M 100, 100 m -75, 0 a 75,75 0 1,0 150,0 a 75,75 0 1,0 -150,0'
                  />
                </Icon>
                <Heading as="h4" size="xs">

                  {status.toUpperCase()}
                </Heading>
              </HStack>

            </CardHeader>
            <CardBody>
              {/* <h1>{bikeID}</h1> */}
              <Text as='b' fontSize='6xl'>{bikeID}</Text>
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
            <Button colorScheme='red' onClick={onOpen}>Delete Customer</Button>
            <AlertDialog
              isOpen={isOpen}
              leastDestructiveRef={cancelRef}
              onClose={onClose}
            >

              <AlertDialogOverlay>
                <AlertDialogContent>
                  <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                    Delete Customer
                  </AlertDialogHeader>

                  <AlertDialogBody>
                    Are you sure? You can't undo this action afterwards.
                  </AlertDialogBody>

                  <AlertDialogFooter>
                    <Button ref={cancelRef} onClick={onClose}>
                      Cancel
                    </Button>
                    <Button colorScheme='red' onClick={onClose} ml={3}>
                      Delete
                    </Button>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialogOverlay>
            </AlertDialog>
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


