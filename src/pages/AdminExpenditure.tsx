import React from "react";
import AdminContainer from "./AdminContainer";
import Container from "../components/Container";
import { HStack, Text } from "@chakra-ui/react";
import AddExpenditure from "../components/AddExpenditure";

export default function AdminExpenditure() {
  return (
    <AdminContainer activeNav={"expenditure"}>
      <Container mt={2}>
        <HStack justify={"space-between"} mb={3}>
          <Text fontWeight={600} fontSize={[23, null, 25]} noOfLines={1}>
            Expenditure
          </Text>

          <AddExpenditure />
        </HStack>

        <Text opacity={0.5}>Expenditure is not yet available</Text>
      </Container>
    </AdminContainer>
  );
}
