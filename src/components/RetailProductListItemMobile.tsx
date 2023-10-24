import { Box, Td, Text, Tr } from "@chakra-ui/react";
import React from "react";
import useFormatNumber from "../utils/useFormatNumber";

export default function RetailProductListItemMobile({ p, action }: any) {
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
      <Td className="before" py={2} px={"18px"}>
        <Box>
          <Text noOfLines={1} maxW={"200px"}>
            {p.name}
          </Text>
          <Text fontSize={11} opacity={0.5} noOfLines={1} maxW={"100px"}>
            {p.code}
          </Text>
        </Box>
      </Td>

      <Td textAlign={"center"} py={2} px={"18px"}>
        {p.category}
      </Td>

      <Td py={2} px={"18px"}>
        <Box>
          <Text textAlign={"right"}>{fn(parseInt(p.price))}</Text>
          <Text textAlign={"right"} fontSize={11} opacity={0.5}>
            {fn(parseInt(p.stock))}
          </Text>
        </Box>
      </Td>
    </Tr>
  );
}
