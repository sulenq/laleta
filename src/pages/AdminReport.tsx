import React from "react";
import AdminContainer from "./AdminContainer";
import Container from "../components/Container";
import { Text } from "@chakra-ui/react";

export default function AdminReport() {
  return (
    <AdminContainer activeNav={"report"}>
      <Container mt={2}>
        <Text fontWeight={600} fontSize={[23, null, 25]} noOfLines={1} mb={3}>
          Report
        </Text>

        <Text opacity={0.5}>Page is not yet available</Text>
      </Container>
    </AdminContainer>
  );
}
