import {
  Button,
  HStack,
  Icon,
  Image,
  SimpleGrid,
  Text,
  VStack,
} from "@chakra-ui/react";
import { getCookie } from "typescript-cookie";
import { useState, useEffect } from "react";
import { AuthState } from "../types";
import Container from "../components/Container";
import ProfileSummary from "../components/ProfileSummary";
import { SignOut } from "@phosphor-icons/react";

export default function Home() {
  const [authState, setAuthState] = useState<AuthState | null>(null);

  useEffect(() => {
    const authStateCookie = getCookie("_authState");
    if (authStateCookie) {
      setAuthState(JSON.parse(authStateCookie));
    }
  }, []);

  return (
    <VStack minH={"100vh"}>
      <Container minH={"100%"}>
        <HStack justify={"space-between"} py={4}>
          <ProfileSummary user={authState} />

          <Button
            rightIcon={<Icon as={SignOut} />}
            borderRadius={"full"}
            className="btn clicky"
            variant={"ghost"}
          >
            Sign Out
          </Button>
        </HStack>

        <VStack minH={"100%"}>
          <Image src="/logo.svg" />
          <Text fontSize={28} fontWeight={800}>
            LALETA POS
          </Text>

          <SimpleGrid></SimpleGrid>
        </VStack>
      </Container>
    </VStack>
  );
}
