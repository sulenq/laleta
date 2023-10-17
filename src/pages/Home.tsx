import {
  Box,
  Center,
  Icon,
  Image,
  SimpleGrid,
  Text,
  VStack,
} from "@chakra-ui/react";
import HomeContainer from "../components/HomeContainer";
import homeNav from "../const/homeNav";

export default function Home() {
  return (
    <HomeContainer>
      <VStack flex={1} justify={"center"}>
        <Image src="/logo.svg" mb={4} title="Laleta Logo" />
        <Text fontSize={28} fontWeight={800} mb={6}>
          LALETA POS
        </Text>

        <SimpleGrid columns={[2, null, 3]} gap={4} mb={4}>
          {homeNav.map((n, i) => (
            <VStack
              key={i}
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
          ))}
        </SimpleGrid>
      </VStack>

      <Box opacity={0.5}>
        <Text textAlign={"center"}>v.1</Text>
        <Text textAlign={"center"} fontSize={[11, null, 13]}>
          powered by Distro Studio
        </Text>
      </Box>
    </HomeContainer>
  );
}
