import { Badge, Center, Image, SimpleGrid, VStack } from "@chakra-ui/react";
import React from "react";

type Props = any;

export default function WorkOutletItem(props: Props) {
  return (
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
  );
}
