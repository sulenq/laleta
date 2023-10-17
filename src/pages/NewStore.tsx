import HomeContainer from "../components/HomeContainer";
import { Image, SimpleGrid, VStack } from "@chakra-ui/react";
import NavHeader from "../components/NavHeader";
import Container from "../components/Container";

export default function NewStore() {
  return (
    <HomeContainer>
      <NavHeader title={"Add New Store"} left={"backButton"} />

      <Container flex={1}>
        <VStack flex={1} justify={"center"} py={4}>
          <SimpleGrid columns={[1, null, 2]}>
            <Image src="/img/newStore.png" title="New Store Vector" />
          </SimpleGrid>
        </VStack>
      </Container>
    </HomeContainer>
  );
}
