import { Button, HStack, Icon, VStack } from "@chakra-ui/react";
import { getCookie } from "typescript-cookie";
import { useState, useEffect } from "react";
import { AuthState } from "../types";
import Container from "../components/Container";
import ProfileSummary from "../components/ProfileSummary";
import { SignOut } from "@phosphor-icons/react";
import { useComponentsBg } from "../const/colorModeValues";

export default function HomeContainer({ children }: any) {
  const [authState, setAuthState] = useState<AuthState | null>(null);
  const cfg = useComponentsBg();

  useEffect(() => {
    const authStateCookie = getCookie("_authState");
    if (authStateCookie) {
      setAuthState(JSON.parse(authStateCookie));
    }
  }, []);

  return (
    <VStack minH={"100vh"} justify={"stretch"}>
      <Container position={"sticky"} top={0} left={0} {...cfg}>
        <HStack justify={"space-between"} py={4}>
          <ProfileSummary user={authState} />

          <Button
            rightIcon={<Icon as={SignOut} weight="bold" />}
            borderRadius={"full"}
            className="btn-outline clicky"
            variant={"ghost"}
            flexShrink={0}
          >
            Sign Out
          </Button>
        </HStack>
      </Container>

      <Container flex={1}>
        <VStack gap={0} flex={1} justify={"center"} py={4}>
          {children}
        </VStack>
      </Container>
    </VStack>
  );
}
