import React from "react";
import AdminContainer from "../components/AdminContainer";
import { Text } from "@chakra-ui/react";
import Container from "../components/Container";

export default function AdminDashboard() {
  return (
    <AdminContainer activeNav={"dashboard"}>
      <Container mt={2}>
        <Text fontWeight={600} fontSize={[23, null, 25]} noOfLines={1} mb={3}>
          Dashboard
        </Text>

        <Text opacity={0.5}>Page is not yet available</Text>
      </Container>
    </AdminContainer>
  );
}
