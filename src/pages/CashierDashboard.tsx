import React from "react";
import CashierContainer from "../components/CashierContainer";
import Container from "../components/Container";
import { Text } from "@chakra-ui/react";

export default function CashierDashboard() {
  return (
    <CashierContainer activeNav={"dashboard"}>
      <Container mt={2}>
        <Text fontWeight={600} fontSize={[19, null, 21]} noOfLines={1} mb={3}>
          Dashboard
        </Text>

        <Text opacity={0.5}>Page is not yet available</Text>
      </Container>
    </CashierContainer>
  );
}
