import React from "react";
import AdminContainer from "./AdminContainer";
import {
  Box,
  Center,
  HStack,
  Icon,
  Image,
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
import { Bookmark, GridFour, Package } from "@phosphor-icons/react";
import useScreenWidth from "../utils/useGetScreenWidth";
import useGetRetailProduct from "../utils/useGetRetailProductByOutlet";
import AddRetailProduct from "../components/AddRetailProduct";
import { RetailProduct } from "../types";
import useFormatNumber from "../utils/useFormatNumber";
import { useNavigate } from "react-router-dom";

export default function AdminRetailProduct() {
  const sw = useScreenWidth();
  const fn = useFormatNumber;
  const navigate = useNavigate();

  const retailProducts = useGetRetailProduct();
  const stats = [
    {
      icon: Package,
      value: retailProducts?.data?.length || "~",
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
    <AdminContainer activeNav="product">
      <Container mt={2}>
        <HStack justify={"space-between"} mb={3}>
          <Text fontWeight={600} fontSize={[23, null, 25]} noOfLines={1}>
            Product
          </Text>

          <AddRetailProduct />
        </HStack>
      </Container>

      {retailProducts?.status === "error" && (
        <Container>
          <Text mt={4} textAlign={"center"}>
            Error : {retailProducts?.data.message}
          </Text>
        </Container>
      )}

      {retailProducts?.status === "notFound" && (
        <Container flex={1} justify={"center"}>
          <Image
            w={"100%"}
            maxW={"250px"}
            mx={"auto"}
            src="/img/noResult.png"
          />

          <Text
            textAlign={"center"}
            fontSize={[19, null, 21]}
            fontWeight={500}
            mt={4}
            mb={2}
          >
            {retailProducts?.data.message}
          </Text>

          <Text textAlign={"center"} opacity={0.5} w={"80%"} mx={"auto"}>
            You can add product by clicking Add Product button at the top right
            og the page
          </Text>
        </Container>
      )}

      {retailProducts?.status === "found" && (
        <>
          <Container>
            <SimpleGrid
              columns={[1, null, 2]}
              gap={4}
              mb={3}
              alignItems={"center"}
            >
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

          <Box overflow={"auto"}>
            <Table>
              {sw < 900 ? (
                <>
                  <Thead opacity={0.5}>
                    <Tr>
                      <Th py={2} px={"18px"} color={"curent"}>
                        Code/Name
                      </Th>

                      <Th
                        py={2}
                        px={"18px"}
                        color={"curent"}
                        textAlign={"center"}
                      >
                        Category
                      </Th>

                      <Th isNumeric py={2} px={"18px"} color={"curent"}>
                        Price/Stock
                      </Th>
                    </Tr>
                  </Thead>

                  <Tbody>
                    {retailProducts.data.map((p: RetailProduct, i: number) => (
                      <Tr
                        key={i}
                        className="listItem"
                        _hover={{ bg: "var(--divider)" }}
                        cursor={"pointer"}
                        onClick={() => [navigate(`manage/${p.id}`)]}
                      >
                        <Td className="before" py={2} px={"18px"}>
                          <Box>
                            <Text noOfLines={1} maxW={"200px"}>
                              {p.name}
                            </Text>
                            <Text
                              fontSize={11}
                              opacity={0.5}
                              noOfLines={1}
                              maxW={"100px"}
                            >
                              {p.code}
                            </Text>
                          </Box>
                        </Td>

                        <Td textAlign={"center"} py={2} px={"18px"}>
                          {p.category}
                        </Td>

                        <Td py={2} px={"18px"}>
                          <Box>
                            <Text textAlign={"right"}>
                              {fn(parseInt(p.price))}
                            </Text>
                            <Text
                              textAlign={"right"}
                              fontSize={11}
                              opacity={0.5}
                            >
                              {fn(parseInt(p.stock))}
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
                      <Th
                        fontSize={11}
                        py={2}
                        px={"18px"}
                        pl={6}
                        color={"curent"}
                      >
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
                        className="listItem"
                        _hover={{ bg: "var(--divider)" }}
                        cursor={"pointer"}
                        onClick={() => [navigate(`manage/${p.id}`)]}
                      >
                        <Td className="before" py={2} px={"18px"} pl={6}>
                          <Text noOfLines={1} maxW={"200px"}>
                            {p.code}
                          </Text>
                        </Td>

                        <Td py={2} px={"18px"}>
                          <Text noOfLines={1} maxW={"300px"}>
                            {p.name}
                          </Text>
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
          </Box>
        </>
      )}
    </AdminContainer>
  );
}