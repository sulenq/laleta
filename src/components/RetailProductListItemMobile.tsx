import React from "react";
import { Box, Td, Text, Tr } from "@chakra-ui/react";
import useFormatNumber from "../utils/useFormatNumber";
import { RetailProduct } from "../types";
import { useLocation } from "react-router-dom";

type Props = {
  p: RetailProduct;
  action: (param: any) => void;
};

export default function RetailProductListItemMobile({ p, action }: Props) {
  const fn = useFormatNumber;
  const location = useLocation();
  const path = location.pathname.split("/");
  const endpoint = path[path.length - 1];

  return (
    <Tr
      className="listItem"
      _hover={{ bg: "var(--divider)" }}
      cursor={"pointer"}
      onClick={() => {
        if (endpoint === "retail-product-search") {
          action({
            id: p.id,
            code: p.code,
            name: p.name,
            price: parseInt(p.price),
            qty: 1,
            totalPrice: parseInt(p.price),
            stock: parseInt(p.stock),
            category: p.category,
          });
          window.history.back();
        } else {
          action(p.id);
        }
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
