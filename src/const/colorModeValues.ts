import { useColorModeValue } from "@chakra-ui/react";

const useComponentsBg = () =>
  useColorModeValue(
    { bg: "#ffffffcc", backdropFilter: "blur(10px)" },
    { bg: "#000000cc", backdropFilter: "blur(10px)" }
  );

const useBodyBg = () => useColorModeValue("var(--divider)", "b");

export { useComponentsBg, useBodyBg };
