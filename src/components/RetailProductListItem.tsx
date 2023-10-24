import { Td, Text, Tr } from "@chakra-ui/react";
import React from "react";
import useFormatNumber from "../utils/useFormatNumber";

export default function RetailProductListItem({ p, action }: any) {
  const fn = useFormatNumber;

  return (
    <Tr
      className="listItem"
      _hover={{ bg: "var(--divider)" }}
      cursor={"pointer"}
      onClick={() => {
        action(p.id);
      }}
    >
      <Td className="before" py={2} px={"18px"} pl={6}>
        <Text noOfLines={1} maxW={"200px"}>
          {p.code}
        </Text>
      </Td>

      <Td py={2} px={"18px"}>
        <Text noOfLines={1} maxW={"300px"}>
          {p.name}
        </Text>
      </Td>

      <Td textAlign={"center"} py={2} px={"18px"}>
        {p.category}
      </Td>

      <Td isNumeric py={2} px={"18px"}>
        {fn(parseInt(p.stock))}
      </Td>

      <Td isNumeric py={2} px={"18px"} pr={6}>
        {fn(parseInt(p.price))}
      </Td>
    </Tr>
  );
}
