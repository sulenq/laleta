import React from "react";
import AdminContainer from "../components/AdminContainer";
import Container from "../components/Container";
import { HStack, Text } from "@chakra-ui/react";
import AddExpenditure from "../components/AddExpenditure";
import { pageTitleSize } from "../const/sizes";

export default function AdminExpenditure() {
  return (
    <AdminContainer activeNav={"expenditure"}>
      <Container mt={2}>
        <HStack justify={"space-between"} mb={3}>
          <Text fontWeight={600} fontSize={pageTitleSize} noOfLines={1}>
            Expenditure
          </Text>

          <AddExpenditure />
        </HStack>

        <Text opacity={0.5}>Expenditure is not yet available</Text>
      </Container>
    </AdminContainer>
  );
}
