import React, { useState, useEffect } from "react";
import CashierContainer from "../components/CashierContainer";
import Container from "../components/Container";
import { HStack, Icon, IconButton, Text, Tooltip } from "@chakra-ui/react";
import { Plus } from "@phosphor-icons/react";
import { iconSize } from "../const/sizes";
import RetailProductSearchComponent from "../components/RetailProductSearchComponent";
import useRetailProducts from "../globalState/useRetailProducts";
import { useParams } from "react-router-dom";
import useJwt from "../globalState/useJwt";
import axios from "axios";
import ContentSpinner from "../components/ContentSpinner";
import OrderList from "../components/OrderList";
import Checkout from "../components/Checkout";
import OrderInfo from "../components/OrderInfo";

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

      <Container borderRight={"1px solid var(--divider)"}>
        <HStack justify={"space-between"} my={3}>
          <Text fontWeight={600} fontSize={[19, null, 21]} noOfLines={1}>
            Cashiering
          </Text>

          <HStack>
            <Tooltip label={"New Transaction"} openDelay={500} placement="left">
              <IconButton
                aria-label="New Transaction"
                icon={<Icon as={Plus} fontSize={iconSize} weight="bold" />}
                borderRadius={"full"}
                size={"sm"}
                className="clicky"
                colorScheme="ap"
                variant={"outline"}
                _hover={{ bg: "var(--p200a)" }}
              />
            </Tooltip>

            <Checkout />
          </HStack>
        </HStack>
      </Container>

      <Container>
        <HStack gap={4} justify={"space-between"}>
          <RetailProductSearchComponent />

          <OrderInfo />
        </HStack>
      </Container>

      <OrderList />
    </CashierContainer>
  );
}
