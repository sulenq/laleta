import { HStack, Text, VStack } from "@chakra-ui/react";
import React from "react";
import useOrder from "../globalState/useOrder";
import useFormatNumber from "../utils/useFormatNumber";

export default function OrderInfo() {
  const { totalPayment, orderList } = useOrder();
  const fn = useFormatNumber;

  return (
    <HStack gap={[4, null, 8]} flexShrink={0}>
      <VStack
        flexShrink={0}
        justify={"space-between"}
        align={"flex-end"}
        gap={0}
        opacity={0.5}
      >
        <Text fontSize={[9, null, 11]}>Total Order</Text>

        <Text lineHeight={1} fontSize={[21, null, 23]} fontWeight={500}>
          {orderList.length}
        </Text>
      </VStack>

      <VStack
        flexShrink={0}
        align={"flex-end"}
        justify={"space-between"}
        gap={0}
      >
        <Text fontSize={[9, null, 11]} opacity={0.5}>
          Total Payment
        </Text>

        <Text
          // color={"p.500"}
          lineHeight={1}
          fontSize={[21, null, 23]}
          fontWeight={800}
        >
          {fn(totalPayment)}
        </Text>
      </VStack>
    </HStack>
  );
}
