import React from "react";
import AdminContainer from "./AdminContainer";
import {
  Box,
  Button,
  Center,
  HStack,
  Icon,
  IconButton,
  Input,
  SimpleGrid,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  VStack,
} from "@chakra-ui/react";
import Container from "../components/Container";
import { Bookmark, GridFour, Package, PlusCircle } from "@phosphor-icons/react";
import useScreenWidth from "../utils/useGetScreenWidth";
import useGetRetailProduct from "../utils/useGetRetailProduct";

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
  const retailProducts = useGetRetailProduct();

  return (
    <AdminContainer>
      <Container mt={2}>
        <HStack justify={"space-between"} mb={3}>
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
        <SimpleGrid columns={[1, null, 2]} gap={4} mb={3} alignItems={"center"}>
          <Input
            className="filled"
            placeholder="Search product by code or name"
          />

          <SimpleGrid columns={3} gap={6}>
            {stats.map((s, i) => (
              <HStack key={i} py={1} justify={"space-between"}>
                <Center p={1} borderRadius={"full"} bg={s.bg}>
                  <Icon as={s.icon} fontSize={21} color={"white"} />
                </Center>

                <VStack align={"flex-end"} gap={0}>
                  <Text fontWeight={600} lineHeight={1} mb={"2px"}>
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

      {!retailProducts?.status && (
        <Text>Error : {retailProducts?.data.message}</Text>
      )}

      {retailProducts?.status && (
        <Table>
          {sw < 900 ? (
            <>
              <Thead opacity={0.5}>
                <Tr>
                  <Th py={2} px={"18px"} color={"curent"}>
                    Code/Name
                  </Th>

                  <Th py={2} px={"18px"} color={"curent"} textAlign={"center"}>
                    Category
                  </Th>

                  <Th isNumeric py={2} px={"18px"} color={"curent"}>
                    Price/Stock
                  </Th>
                </Tr>
              </Thead>

              <Tbody>
                {retailProducts.data.map((p: any, i: number) => (
                  <Tr
                    key={i}
                    _hover={{ bg: "var(--divider)" }}
                    cursor={"pointer"}
                  >
                    <Td py={2} px={"18px"}>
                      <Box>
                        <Text>{p.name}</Text>
                        <Text fontSize={11} opacity={0.5}>
                          {p.code}
                        </Text>
                      </Box>
                    </Td>

                    <Td textAlign={"center"} py={2} px={"18px"}>
                      {p.category}
                    </Td>

                    <Td py={2} px={"18px"}>
                      <Box>
                        <Text textAlign={"right"}>{p.price}</Text>
                        <Text textAlign={"right"} fontSize={11} opacity={0.5}>
                          {p.stock}
                        </Text>
                      </Box>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </>
          ) : (
            <>
              <Thead opacity={0.5}>
                <Tr>
                  <Th fontSize={11} py={2} px={"18px"} pl={6} color={"curent"}>
                    Code
                  </Th>

                  <Th fontSize={11} py={2} px={"18px"} color={"curent"}>
                    Name
                  </Th>

                  <Th
                    fontSize={11}
                    py={2}
                    px={"18px"}
                    color={"curent"}
                    textAlign={"center"}
                  >
                    Category
                  </Th>

                  <Th
                    isNumeric
                    fontSize={11}
                    py={2}
                    px={"18px"}
                    color={"curent"}
                  >
                    Stock
                  </Th>

                  <Th
                    isNumeric
                    fontSize={11}
                    py={2}
                    px={"18px"}
                    pr={6}
                    color={"curent"}
                  >
                    Price
                  </Th>
                </Tr>
              </Thead>

              <Tbody>
                {retailProducts.data.map((p: any, i: number) => (
                  <Tr
                    key={i}
                    _hover={{ bg: "var(--divider)" }}
                    cursor={"pointer"}
                  >
                    <Td py={2} px={"18px"} pl={6}>
                      {p.code}
                    </Td>

                    <Td py={2} px={"18px"}>
                      {p.name}
                    </Td>

                    <Td textAlign={"center"} py={2} px={"18px"}>
                      {p.category}
                    </Td>

                    <Td isNumeric py={2} px={"18px"}>
                      {p.price}
                    </Td>

                    <Td isNumeric py={2} px={"18px"} pr={6}>
                      {p.price}
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </>
          )}
        </Table>
      )}
    </AdminContainer>
  );
}
