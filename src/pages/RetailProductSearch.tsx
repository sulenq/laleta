import React from "react";
import CashierContainer from "../components/CashierContainer";
import NavHeader from "../components/NavHeader";
import { VStack } from "@chakra-ui/react";
import RetailProductList from "../components/RetailProductList";
import useOrder from "../globalState/useOrder";
import useGetHeaderHeight from "../utils/useGetHeaderHeight";

export default function RetailProductSearch() {
  const { addOrder } = useOrder();
  const hh = useGetHeaderHeight();

  const addOrderAction = (param: any) => {
    addOrder(param);
  };

  return (
    <CashierContainer activeNav={"cashiering"}>
      <NavHeader title={"Product Search"} left={"backButton"} top={hh} />

      <VStack flex={1} align={"stretch"} mt={1}>
        <RetailProductList action={addOrderAction} />
      </VStack>
    </CashierContainer>
  );
}
