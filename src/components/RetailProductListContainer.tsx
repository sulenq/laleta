import React from "react";
import { Table, Tbody, Th, Thead, Tr } from "@chakra-ui/react";

export default function RetailProductListContainer({ children }: any) {
  return (
    <Table>
      <Thead opacity={0.5}>
        <Tr>
          <Th fontSize={11} py={2} px={"18px"} pl={6} color={"curent"}>
            Code
          </Th>

          <Th fontSize={11} py={2} px={"18px"} color={"curent"}>
            Name
          </Th>

          <Th
            fontSize={11}
            py={2}
            px={"18px"}
            color={"curent"}
            textAlign={"center"}
          >
            Category
          </Th>

          <Th isNumeric fontSize={11} py={2} px={"18px"} color={"curent"}>
            Stock
          </Th>

          <Th
            isNumeric
            fontSize={11}
            py={2}
            px={"18px"}
            pr={6}
            color={"curent"}
          >
            Price
          </Th>
        </Tr>
      </Thead>

      <Tbody>{children}</Tbody>
    </Table>
  );
}
