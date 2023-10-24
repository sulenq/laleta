import React from "react";
import AdminContainer from "../components/AdminContainer";
import { HStack, Text } from "@chakra-ui/react";
import Container from "../components/Container";
import AddRetailProduct from "../components/AddRetailProduct";
import RetailProductList from "../components/RetailProductList";
import { useNavigate } from "react-router-dom";

export default function AdminRetailProduct() {
  const navigate = useNavigate();
  const manage = (id: string) => {
    navigate(`manage/${id}`);
  };

  return (
    <AdminContainer activeNav="product">
      <Container mt={2}>
        <HStack justify={"space-between"} mb={3}>
          <Text fontWeight={600} fontSize={[19, null, 21]} noOfLines={1}>
            Product
          </Text>

          <AddRetailProduct />
        </HStack>
      </Container>

      <RetailProductList action={manage} />
    </AdminContainer>
  );
}
