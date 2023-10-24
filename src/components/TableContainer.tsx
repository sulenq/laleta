import { Box } from "@chakra-ui/react";
import React from "react";

export default function TableContainer({ children }: any) {
  return <Box overflow={"auto"}>{children}</Box>;
}
