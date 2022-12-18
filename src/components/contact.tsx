import {
  Heading,
  Container,
  Text,
  Button,
  Stack,
  Flex,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Box,
} from "@chakra-ui/react";
import { AiOutlineInstagram } from "react-icons/ai";

const Contact = () => {
  return (
    <Flex
      alignItems="center"
      justifyContent="center"
      textAlign="center"
      minH="100vh"
    >
        <Stack
          textAlign={"center"}
          align={"center"}
          spacing={{ base: 8, md: 10 }}
          py={{ base: 20, md: 28 }}
        >
          <Heading
            fontWeight={600}
            fontSize={{ base: "3xl", sm: "4xl", md: "6xl" }}
            lineHeight={"110%"}
            bgClip="text"
            bgGradient="linear(to-r, #FF4E50, #F9D423)"
          >
            Contact
          </Heading>
          <Flex
            overflowY="scroll"
            gap="10"
            flexDirection={{ lg: "row", base: "column" }}
          >
            <Card boxShadow="xl">
              <CardHeader>
                <img src="Puen.png" alt="Puen"></img>
                <Heading size="md">Puen</Heading>
              </CardHeader>
              <CardBody>
                <Text>
                  Kittipong Tapyou
                  <br />
                  ID | 65070501003
                </Text>
              </CardBody>
              <CardFooter></CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <img src="Mo.png" alt="Mo"></img>
                <Heading size="md">Mo</Heading>
              </CardHeader>
              <CardBody>
                <Text>
                  Natlada Simasathien
                  <br />
                  ID | 65070501019
                </Text>
              </CardBody>
              <CardFooter>
                <Box boxShadow="base" alignContent="center" alignSelf="center" justifyContent="center">
                  <Button as="a" href="https://www.instagram.com/encall_apichat/" leftIcon={<AiOutlineInstagram />} >Instagram</Button>
                </Box>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <img src="Tor.png" alt="Tor"></img>
                <Heading size="md">Tor</Heading>
              </CardHeader>
              <CardBody>
                <Text>
                  Wongsatorn Sungsilpawech
                  <br />
                  ID | 65070501050
                </Text>
              </CardBody>
              <CardFooter></CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <img src="Yim.png" alt="Yim"></img>
                <Heading size="md">Yim</Heading>
              </CardHeader>
              <CardBody>
                <Text>
                  Apichat Aimimpak
                  <br />
                  ID | 65070501059
                </Text>
              </CardBody>
              <CardFooter></CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <img src="Wave.png" alt="Wave"></img>
                <Heading size="md">Wave</Heading>
              </CardHeader>
              <CardBody>
                <Text>
                  Kanit Buntingkool
                  <br />
                  ID | 65070501064
                </Text>
              </CardBody>
              <CardFooter></CardFooter>
            </Card>
          </Flex>
        </Stack>
    </Flex>
  );
};

export default Contact;
