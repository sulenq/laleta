import { Spinner, VStack } from "@chakra-ui/react";
import React from "react";

export default function ContentSpinner() {
  return (
    <VStack flex={1} justify={"center"}>
      <Spinner />
    </VStack>
  );
}
