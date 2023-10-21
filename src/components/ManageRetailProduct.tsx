import React, { useState, useEffect } from "react";
import {
  // Image,
  SimpleGrid,
  VStack,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import useJwt from "../globalState/useJwt";
import AdminContainer from "../pages/AdminContainer";
import Container from "./Container";
import getRetailProduct from "../request/getRetailProduct";
import { RetailProduct } from "../types";
import RetailProductUpdateForm from "./RetailProductUpdateForm";
import NavHeader from "./NavHeader";

export default function ManageRetailProduct() {
  const jwt = useJwt();
  const { outletId, productId } = useParams();
  const [product, setProduct] = useState<RetailProduct | null>(null);

  useEffect(() => {
    async function loadProducts() {
      try {
        if (jwt && productId) {
          const data = await getRetailProduct(jwt, productId);
          setProduct(data.product);
        }
      } catch (error) {
        // Handle error jika perlu
      }
    }

    loadProducts();
  }, [jwt, productId]);

  return (
    <AdminContainer activeNav={"product"}>
      <NavHeader
        title={"Manage Product"}
        left={"backButton"}
        position={"static"}
      />

      <Container flex={1}>
        <VStack flex={1} w={"100%"}>
          <SimpleGrid
            w={"100%"}
            maxW={"500px"}
            columns={[1, null, 1]}
            px={[null, null, 4]}
            gap={8}
          >
            {/* <Image
              py={4}
              src="/img/noResult.png"
              title="Update Product Vector"
            /> */}

            <VStack py={4} justify={"center"} w={"100%"} gap={0}>
              {outletId && product && (
                <RetailProductUpdateForm
                  outletId={outletId}
                  product={product}
                />
              )}
            </VStack>
          </SimpleGrid>
        </VStack>
      </Container>
    </AdminContainer>
  );
}
