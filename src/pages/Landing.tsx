import { ColorModeSwitcher } from "../components/ColorModeSwitcher";
import Container from "../components/Container";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  FormControl,
  FormLabel,
  HStack,
  Icon,
  Image,
  Input,
  Text,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import usePayload from "../globalState/usePayload";
import ProfileSummary from "../components/ProfileSummary";
import { ArrowRight } from "@phosphor-icons/react";

export default function Landing() {
  const bg = useColorModeValue("#ffffffcc", "#000000cc");
  const user = usePayload();

  return (
    <VStack
      bgImage={"/img/grocery.jpg"}
      bgSize={"cover"}
      minH={"100vh"}
      justify={"center"}
    >
      <Container>
        <VStack
          gap={3}
          mx={"auto"}
          w={"100%"}
          maxW={"360px"}
          justify={"center"}
          borderRadius={8}
          p={5}
          bg={bg}
          backdropFilter={"blur(10px)"}
        >
          <ColorModeSwitcher
            position={"absolute"}
            borderRadius={"full"}
            h={"40px !important"}
            top={2}
            right={2}
          />

          <HStack gap={4} alignSelf={"flex-start"} mb={1}>
            <Image src={"./logo512.png"} w={"64px"} />

            <Box>
              <Text fontWeight={500} opacity={0.5}>
                Welcome to the
              </Text>
              <Text fontSize={28} fontWeight={800} lineHeight={1.4}>
                LALETA
              </Text>
            </Box>
          </HStack>

          {user ? (
            <Button
              as={Link}
              to={"/home"}
              w={"100%"}
              borderRadius={"full"}
              h={"50px"}
              colorScheme="bnw"
              className="clicky"
              pl={"6px"}
              pr={3}
            >
              <HStack w={"100%"} justify={"space-between"}>
                <ProfileSummary user={user} />

                <Icon as={ArrowRight} fontSize={20} />
              </HStack>
            </Button>
          ) : (
            <Button
              as={Link}
              to={"/signin"}
              className="clicky"
              colorScheme="bnw"
              w={"100%"}
              h={"44px"}
              borderRadius={"full"}
              fontWeight={700}
              // h={["40px", null, "50px"]}
            >
              Sign In
            </Button>
          )}

          <HStack gap={1}>
            <Text fontSize={[11, null, 13]}>Don't have an account?</Text>
            <Text
              fontSize={[11, null, 13]}
              as={Link}
              to={""}
              fontWeight={600}
              color={"p.500"}
            >
              Sign Up
            </Text>
          </HStack>
        </VStack>
      </Container>

      <Container>
        <VStack w={"100%"} maxW={"360px"} mx={"auto"}>
          <Accordion allowMultiple mb={4} w={"100%"}>
            <AccordionItem
              border={"none"}
              bg={bg}
              backdropFilter={"blur(10px)"}
              borderRadius={8}
            >
              <AccordionButton h={"40px !important"} borderRadius={6}>
                <Text
                  flex="1"
                  fontWeight={600}
                  //   fontSize={17}
                  textAlign={"left"}
                >
                  Demo Account
                </Text>

                <AccordionIcon opacity={0.5} />
              </AccordionButton>

              <AccordionPanel px={4} pt={2} pb={4}>
                <FormControl mb={4}>
                  <FormLabel>Email/username</FormLabel>
                  <Input defaultValue={"adelia"} />
                </FormControl>

                <FormControl>
                  <FormLabel>Password</FormLabel>
                  <Input defaultValue={"adelia123"} />
                </FormControl>
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        </VStack>
      </Container>
    </VStack>
  );
}
