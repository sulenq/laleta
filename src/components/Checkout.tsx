import React from "react";
import { Button, Icon } from "@chakra-ui/react";
import { ArrowRight } from "@phosphor-icons/react";
import { iconSize } from "../const/sizes";
import useOrder from "../globalState/useOrder";

export default function Checkout() {
  const { orderList } = useOrder();

  return (
    <>
      <Button
        colorScheme="ap"
        className="clicky"
        flexShrink={0}
        size={"sm"}
        color={"white"}
        borderRadius={"full"}
        rightIcon={<Icon as={ArrowRight} fontSize={iconSize} />}
        isDisabled={orderList.length < 1 ? true : false}
      >
        Checkout
      </Button>
    </>
  );
}
