import { Button } from "@chakra-ui/react";
import React from "react";

const PrimaryButton = (props: any) => {
  return (
    <Button {...props} className="clicky" colorScheme="ap" color={"wt"}>
      {props?.children}
    </Button>
  );
};

export { PrimaryButton };
