import {
  Box,
  Center,
  HStack,
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
import Container from "../components/Container";
import usePayload from "../globalState/usePayload";
import { ColorModeSwitcher } from "../components/ColorModeSwitcher";
import SignOutModal from "../components/SignOutModal";

export default function Home() {
  const user = usePayload();

  return (
    <HomeContainer>
      <NavHeader
        align={"flex-start"}
        left={<ProfileSummary user={user} />}
        right={
          <HStack gap={4} flexShrink={0}>
            <ColorModeSwitcher size={"sm"} borderRadius={"full"} />

            <SignOutModal size={"sm"} />
          </HStack>
        }
      />

      <Container flex={1} py={4}>
        <VStack flex={1} justify={"center"}>
          <Image src="/logo.svg" mb={4} title="Laleta Logo" loading="eager" />
          <Text fontSize={28} fontWeight={800} mb={6}>
            LALETA
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
