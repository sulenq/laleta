import React from "react";
import AdminContainer from "../components/AdminContainer";
import Container from "../components/Container";
import { Text } from "@chakra-ui/react";
import { pageTitleSize } from "../const/sizes";

export default function AdminEmployee() {
  return (
    <AdminContainer activeNav={"employee"}>
      <Container mt={2}>
        <Text fontWeight={600} fontSize={pageTitleSize} noOfLines={1} mb={3}>
          Employee
        </Text>

        <Text opacity={0.5}>Page is not yet available</Text>
      </Container>
    </AdminContainer>
  );
}
