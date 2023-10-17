import { Box, HStack, Text } from "@chakra-ui/react";
import BackButton from "./BackButton";
import { useComponentsBg } from "../const/colorModeValues";

export default function NavHeader(props: any) {
  const navHeaderBg = useComponentsBg();

  return (
    <HStack
      w={"100%"}
      maxW={"1040px"}
      mx={"auto"}
      justify={"space-between"}
      bg={props.bg || navHeaderBg}
      animation={"fade-in 300ms"}
    >
      {props.left === "backButton" ? (
        <BackButton />
      ) : (
        props.left || <Box w={"40px"} h={"40px"} />
      )}

      <Text fontWeight={700} fontSize={15}>
        {props.title}
      </Text>

      {props.right || <Box w={"40px"} h={"40px"} />}
    </HStack>
  );
}
