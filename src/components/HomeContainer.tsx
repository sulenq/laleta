import { VStack } from "@chakra-ui/react";

export default function HomeContainer({ children }: any) {
  return (
    <VStack minH={"100vh"} justify={"stretch"} gap={0}>
      {children}
    </VStack>
  );
}
