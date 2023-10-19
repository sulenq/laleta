import React from "react";
import AdminContainer from "./AdminContainer";
import {
  Button,
  Center,
  HStack,
  Icon,
  IconButton,
  Input,
  SimpleGrid,
  Text,
  VStack,
} from "@chakra-ui/react";
import Container from "../components/Container";
import { Bookmark, GridFour, Package, PlusCircle } from "@phosphor-icons/react";
import useScreenWidth from "../utils/useGetScreenWidth";

export default function AdminProduct() {
  const sw = useScreenWidth();
  const stats = [
    {
      icon: Package,
      value: 2346,
      name: "total",
      bg: "var(--p500)",
    },
    {
      icon: GridFour,
      value: "~",
      name: "no info",
      bg: "var(--cyan)",
    },
    {
      icon: Bookmark,
      value: "~",
      name: "no info",
      bg: "var(--green)",
    },
  ];

  return (
    <AdminContainer>
      <Container mt={2}>
        <HStack justify={"space-between"}>
          <Text fontWeight={600} fontSize={[23, null, 25]} noOfLines={1}>
            Product
          </Text>

          {sw > 300 ? (
            <Button
              colorScheme="ap"
              borderRadius={"full"}
              pl={"2px"}
              pr={5}
              h={"30px"}
              className="clicky"
            >
              <HStack justify={"space-between"}>
                <Icon
                  as={PlusCircle}
                  weight="fill"
                  color={"white"}
                  fontSize={[25, null, 27]}
                />

                <Text color={"white"}>Add Product</Text>
              </HStack>
            </Button>
          ) : (
            <IconButton
              aria-label="Add Product"
              icon={
                <Icon
                  as={PlusCircle}
                  weight="fill"
                  color={"white"}
                  fontSize={[25, null, 27]}
                />
              }
              colorScheme="ap"
              borderRadius={"full"}
              h={"30px"}
              minW={"30px"}
              className="clicky"
            />
          )}
        </HStack>
      </Container>

      <Container>
        <SimpleGrid columns={[1, null, 2]} gap={4} alignItems={"center"} mt={1}>
          <Input
            className="filled"
            placeholder="Search product by code or name"
          />

          <SimpleGrid columns={3} mb={4}>
            {stats.map((s, i) => (
              <HStack
                key={i}
                pl={i === 0 ? 2 : 4}
                pr={i === 2 ? 3 : 4}
                py={1}
                justify={"space-between"}
                borderRight={i === 0 ? "1px solid var(--divider)" : 4}
                borderLeft={i === 2 ? "1px solid var(--divider)" : 4}
              >
                <Center p={1} borderRadius={"full"} bg={s.bg}>
                  <Icon as={s.icon} fontSize={21} color={"white"} />
                </Center>

                <VStack align={"flex-end"} gap={0}>
                  <Text
                    fontSize={[17, null, 19]}
                    fontWeight={600}
                    lineHeight={1}
                    mb={"2px"}
                  >
                    {s.value}
                  </Text>
                  <Text
                    flexShrink={0}
                    textAlign={"right"}
                    lineHeight={1}
                    opacity={0.5}
                    fontSize={[11, null, 13]}
                  >
                    {s.name}
                  </Text>
                </VStack>
              </HStack>
            ))}
          </SimpleGrid>
        </SimpleGrid>
      </Container>

      
    </AdminContainer>
  );
}
