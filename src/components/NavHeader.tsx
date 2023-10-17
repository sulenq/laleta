import { Box, HStack, Text, VStack, useColorModeValue } from "@chakra-ui/react";
import BackButton from "./BackButton";

export default function NavHeader(props: any) {
  const cfg = useColorModeValue(
    {
      bg: "linear-gradient(to bottom, #ffffff, #ffffffaa)",
      backdropFilter: "blur(10px)",
    },
    {
      bg: "linear-gradient(to bottom, #000000, #000000aa)",
      backdropFilter: "blur(10px)",
    }
  );

  return (
    <VStack
      w={"100%"}
      zIndex={99}
      position={"sticky"}
      top={0}
      left={0}
      p={"10px" }
      {...cfg}
    >
      <HStack
        w={"100%"}
        maxW={"1040px"}
        mx={"auto"}
        justify={"space-between"}
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
    </VStack>
  );
}
