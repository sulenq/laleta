import React from "react";
import { Image, Text, VStack } from "@chakra-ui/react";
import AdminContainer from "./AdminContainer";
import Container from "../components/Container";
import RetailProductUpdateForm from "../components/RetailProductUpdateForm";
import NavHeader from "../components/NavHeader";
import useGetRetailProduct from "../request/useGetRetailProduct";
import { useParams } from "react-router-dom";
import ContentSpinner from "../components/ContentSpinner";

export default function AdminManageRetailProduct() {
  const { productId } = useParams();
  const retailProduct = useGetRetailProduct(productId);
  const { outletId } = useParams();

  return (
    <AdminContainer activeNav={"product"}>
      {!retailProduct && <ContentSpinner />}

      {retailProduct?.status === "error" && (
        <Container>
          <Text mt={4} textAlign={"center"}>
            Error : {retailProduct?.data.message}
          </Text>
        </Container>
      )}

      {retailProduct?.status === "notFound" && (
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
            {retailProduct?.data.message}
          </Text>

          <Text textAlign={"center"} opacity={0.5} w={"80%"} mx={"auto"}>
            Something is not right
          </Text>
        </Container>
      )}

      {retailProduct?.status === "found" && outletId && (
        <>
          <NavHeader
            title={"Manage Product"}
            left={"backButton"}
            position={"static"}
          />

          <Container>
            <VStack
              mx={"auto"}
              maxW={"500px"}
              py={4}
              justify={"center"}
              w={"100%"}
              gap={0}
            >
              <RetailProductUpdateForm
                outletId={outletId}
                product={retailProduct.data}
              />
            </VStack>
          </Container>
        </>
      )}
    </AdminContainer>
  );
}
