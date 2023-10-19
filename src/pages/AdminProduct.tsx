import React from "react";
import AdminContainer from "./AdminContainer";
import { Button, HStack, Icon, Input, Text } from "@chakra-ui/react";
import Container from "../components/Container";
import { PlusCircle } from "@phosphor-icons/react";

export default function AdminProduct() {
  return (
    <AdminContainer>
      <Container mt={2}>
        <HStack justify={"space-between"}>
          <Text fontWeight={600} fontSize={[23, null, 25]} noOfLines={1}>
            Product
          </Text>

          <Button
            colorScheme="ap"
            borderRadius={"full"}
            pl={"2px"}
            pr={5}
            h={"30px"}
            className="clicky"
          >
            <HStack justify={"space-between"}>
              <Icon
                as={PlusCircle}
                weight="fill"
                color={"white"}
                fontSize={[25, null, 27]}
              />

              <Text color={"white"}>Add Product</Text>
            </HStack>
          </Button>
        </HStack>
      </Container>

      <Container>
        <Input
          className="filled"
          placeholder="Search product by code or name"
        />
      </Container>
    </AdminContainer>
  );
}
