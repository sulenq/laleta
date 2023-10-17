import { VStack } from "@chakra-ui/react";

export default function Container(props: any) {
  return (
    <VStack
      {...props}
      gap={0}
      className="container"
      align={"stretch"}
      w={"100%"}
      maxW={"1080px"}
      mx={"auto"}
      px={props.px || [4, 5, 6]}
    >
      {props.children}
    </VStack>
  );
}
