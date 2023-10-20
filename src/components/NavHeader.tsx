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
      zIndex={98}
      position={props.position || "sticky"}
      top={0}
      left={0}
      p={"10px"}
      {...cfg}
    >
      <HStack
        w={"100%"}
        maxW={"1040px"}
        mx={"auto"}
        justify={"space-between"}
        align={props.align || "center"}
      >
        {props.left === "backButton" ? (
          <BackButton backPath={props.backPath || null} />
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
