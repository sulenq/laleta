import React from "react";
import HomeContainer from "../components/HomeContainer";
import NavHeader from "../components/NavHeader";
import Container from "../components/Container";
import { Badge, Center, Image, SimpleGrid, VStack } from "@chakra-ui/react";

export default function Work() {
  return (
    <HomeContainer>
      <NavHeader title={"Select Work Role"} left={"backButton"} />

      <Container flex={1}>
        <VStack flex={1} w={"100%"} justify={"center"} py={4}>
          <SimpleGrid w={"100%"} columns={[2, null, 2]} gap={4}>
            <VStack
              // bg={"var(--divider)"}
              _hover={{ bg: "var(--divider)" }}
              borderRadius={8}
              p={4}
              cursor={"pointer"}
              className="clicky"
              transition={"200ms"}
            >
              <Center mb={4}>
                <Image src="/img/admin.png" />
              </Center>
              <Badge
                color={"var(--purple)"}
                colorScheme="blue"
                fontSize={[15, null, 17]}
                fontWeight={700}
                borderRadius={"full"}
                px={3}
              >
                Admin
              </Badge>
            </VStack>

            <VStack
              // bg={"var(--divider)"}
              _hover={{ bg: "var(--divider)" }}
              borderRadius={8}
              p={4}
              cursor={"pointer"}
              className="clicky"
              transition={"200ms"}
            >
              <Center mb={4}>
                <Image src="/img/cashier.png" />
              </Center>
              <Badge
                color={"var(--yellow)"}
                colorScheme="yellow"
                fontSize={[15, null, 17]}
                fontWeight={700}
                borderRadius={"full"}
                px={3}
              >
                Cashier
              </Badge>
            </VStack>
          </SimpleGrid>
        </VStack>
      </Container>
    </HomeContainer>
  );
}
