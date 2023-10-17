import {
  Box,
  Button,
  Center,
  Icon,
  Image,
  SimpleGrid,
  Text,
  VStack,
} from "@chakra-ui/react";
import HomeContainer from "../components/HomeContainer";
import homeNav from "../const/homeNav";
import { Link } from "react-router-dom";
import NavHeader from "../components/NavHeader";
import ProfileSummary from "../components/ProfileSummary";
import { SignOut } from "@phosphor-icons/react";
import { useState, useEffect } from "react";
import { AuthState } from "../types";
import { getCookie } from "typescript-cookie";
import Container from "../components/Container";

export default function Home() {
  const [authState, setAuthState] = useState<AuthState | null>(null);

  useEffect(() => {
    const authStateCookie = getCookie("_authState");
    if (authStateCookie) {
      setAuthState(JSON.parse(authStateCookie));
    }
  }, []);

  return (
    <HomeContainer>
      <NavHeader
        left={<ProfileSummary user={authState} />}
        right={
          <Button
            rightIcon={<Icon as={SignOut} weight="bold" />}
            borderRadius={"full"}
            className="btn-outline clicky"
            variant={"ghost"}
            flexShrink={0}
          >
            Sign Out
          </Button>
        }
      />

      <Container flex={1}>
        <VStack flex={1} justify={"center"} py={4}>
          <Image src="/logo.svg" mb={4} title="Laleta Logo" />
          <Text fontSize={28} fontWeight={800} mb={6}>
            LALETA POS
          </Text>

          <SimpleGrid columns={[2, null, 3]} gap={4} mb={4}>
            {homeNav.map((n, i) => (
              <Link key={i} to={n.link}>
                <VStack
                  className="clicky"
                  justify={"center"}
                  p={4}
                  pb={2}
                  borderRadius={8}
                  transition={"200ms"}
                  cursor={"pointer"}
                  _hover={{ bg: "var(--divider)" }}
                >
                  <Center bg={n.bg} borderRadius={8} p={4}>
                    <Icon as={n.icon} color={"wt"} fontSize={72} />
                  </Center>
                  <Text fontWeight={600} opacity={0.5}>
                    {n.name}
                  </Text>
                </VStack>
              </Link>
            ))}
          </SimpleGrid>
        </VStack>

        <Box opacity={0.5} py={2}>
          <Text textAlign={"center"}>v.1</Text>
          <Text textAlign={"center"} fontSize={[11, null, 13]}>
            powered by Distro Studio
          </Text>
        </Box>
      </Container>
    </HomeContainer>
  );
}
