import React from "react";
import AdminContainer from "./AdminContainer";
import { Text } from "@chakra-ui/react";
import Container from "../components/Container";

export default function AdminDashboard() {
  return (
    <AdminContainer activeNav={'dashboard'}>
      <Container mt={2}>
        <Text fontWeight={600} fontSize={[23, null, 25]} noOfLines={1}>
          Dashboard
        </Text>
      </Container>

      <Container flex={1}>
        <Text opacity={0.5}>Page is not yet available</Text>
      </Container>
    </AdminContainer>
  );
}
