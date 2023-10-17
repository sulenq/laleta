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
      h={"100%"}
      minH={"100%"}
      mx={"auto"}
      px={props.px || [4, null, 6]}
    >
      {props.children}
    </VStack>
  );
}
