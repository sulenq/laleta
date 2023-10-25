import React from "react";
import CashierContainer from "../components/CashierContainer";
import Container from "../components/Container";
import { Text } from "@chakra-ui/react";
import { pageTitleSize } from "../const/sizes";

export default function CashierTransaction() {
  return (
    <CashierContainer activeNav={"transaction"}>
      <Container mt={2}>
        <Text fontWeight={600} fontSize={pageTitleSize} noOfLines={1} mb={3}>
          Transaction
        </Text>

        <Text opacity={0.5}>Page is not yet available</Text>
      </Container>
    </CashierContainer>
  );
}
