import React, { useState, useEffect } from "react";
import CashierContainer from "../components/CashierContainer";
import Container from "../components/Container";
import { HStack, Text } from "@chakra-ui/react";
import RetailProductSearchComponent from "../components/CashierRetailProductSearchComponent";
import useRetailProducts from "../globalState/useRetailProducts";
import { useParams } from "react-router-dom";
import useJwt from "../globalState/useJwt";
import axios from "axios";
import ContentSpinner from "../components/ContentSpinner";
import OrderList from "../components/RetailProductOrderList";
import Checkout from "../components/Checkout";
import ResetOrder from "../components/ResetOrder";
import { pageTitleSize } from "../const/sizes";

export default function CashierCashiering() {
  const { retailProducts, setRetailProducts } = useRetailProducts();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<boolean>(false);
  const { outletId } = useParams();
  const jwt = useJwt();

  useEffect(() => {
    const fetch = async () => {
      const options = {
        method: "GET",
        baseURL: process.env.REACT_APP_BASE_URL,
        url: `api/retailproduct-by-outlet/${outletId}`,
        headers: { Authorization: "Bearer " + jwt },
      };

      try {
        setLoading(true);
        const response = await axios.request(options);
        console.log(response.data);

        if (response.data.status === 200) {
          setRetailProducts(response.data.data);
          setLoading(false);
        } else if (response.data.status === 404) {
          // navigate("/signin");
        }
      } catch (error) {
        console.error(error);
        setError(true);
      }
    };

    if (jwt) {
      if (!retailProducts) {
        fetch();
      }
    }
  }, [jwt, outletId, retailProducts, setRetailProducts]);

  return (
    <CashierContainer activeNav={"cashiering"}>
      {loading && <ContentSpinner />}

      {error && (
        <Container>
          <Text mt={4} textAlign={"center"}>
            Error : Something wrong
          </Text>
        </Container>
      )}

      {!loading && (
        <>
          <Container borderRight={"1px solid var(--divider)"}>
            <HStack justify={"space-between"} my={2}>
              <Text fontWeight={600} fontSize={pageTitleSize} noOfLines={1}>
                Cashiering
              </Text>

              <HStack>
                <ResetOrder />

                <Checkout />
              </HStack>
            </HStack>
          </Container>
          <Container>
            <HStack gap={4} justify={"space-between"}>
              <RetailProductSearchComponent />
            </HStack>
          </Container>
          <OrderList />
        </>
      )}
    </CashierContainer>
  );
}
