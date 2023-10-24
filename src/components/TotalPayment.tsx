import React from "react";
import { Text, VStack } from "@chakra-ui/react";
import useOrder from "../globalState/useOrder";
import useFormatNumber from "../utils/useFormatNumber";
import { pageTitleSize } from "../const/sizes";

export default function TotalPayment() {
  const { totalPayment } = useOrder();
  const fn = useFormatNumber;

  if (totalPayment === 0) {
    return (
      <Text fontWeight={600} fontSize={pageTitleSize} noOfLines={1}>
        Cashiering
      </Text>
    );
  }

  return (
    <VStack
      flexShrink={0}
      align={"flex-start"}
      justify={"space-between"}
      gap={0}
    >
      <Text fontSize={[9, null, 11]} opacity={0.5}>
        Total Payment
      </Text>

      <Text
        // color={"p.500"}
        lineHeight={1}
        fontSize={[19, null, 21]}
        fontWeight={800}
      >
        {fn(totalPayment)}
      </Text>
    </VStack>
  );
}
