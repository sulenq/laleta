import React from "react";
import AdminContainer from "../components/AdminContainer";
import { HStack, Text } from "@chakra-ui/react";
import Container from "../components/Container";
import AddRetailProduct from "../components/AddRetailProduct";
import RetailProductList from "../components/RetailProductList";

export default function AdminRetailProduct() {
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

      <RetailProductList />
    </AdminContainer>
  );
}
