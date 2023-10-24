import React from "react";
import { Icon, IconButton } from "@chakra-ui/react";
import { Plus } from "@phosphor-icons/react";
import { iconSize } from "../const/sizes";
import useOrder from "../globalState/useOrder";

export default function ResetOrder() {
  const { resetOrder } = useOrder();

  return (
    <IconButton
      aria-label="New Transaction"
      icon={<Icon as={Plus} fontSize={iconSize} weight="bold" />}
      borderRadius={"full"}
      size={"sm"}
      className="clicky"
      colorScheme="ap"
      variant={"outline"}
      _hover={{ bg: "var(--p200a)" }}
      onClick={() => {
        resetOrder();
      }}
    />
  );
}
