import { Td, Text, Tr } from "@chakra-ui/react";
import React from "react";
import useFormatNumber from "../utils/useFormatNumber";
import { useLocation } from "react-router-dom";
import { RetailProduct } from "../types";

type Props = {
  p: RetailProduct;
  action: (param: any) => void;
};

export default function RetailProductListItem({ p, action }: Props) {
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
