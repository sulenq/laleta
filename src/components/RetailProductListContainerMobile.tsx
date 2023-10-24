import React from "react";
import { Table, Tbody, Th, Thead, Tr } from "@chakra-ui/react";

export default function RetailProductListContainerMobile({ children }: any) {
  return (
    <Table>
      <Thead opacity={0.5}>
        <Tr>
          <Th py={2} px={"18px"} color={"curent"}>
            Code/Name
          </Th>

          <Th py={2} px={"18px"} color={"curent"} textAlign={"center"}>
            Category
          </Th>

          <Th isNumeric py={2} px={"18px"} color={"curent"}>
            Price/Stock
          </Th>
        </Tr>
      </Thead>

      <Tbody>{children}</Tbody>
    </Table>
  );
}
