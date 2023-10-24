import { VStack } from "@chakra-ui/react";

export default function HomeContainer({ children }: any) {
  return (
    <VStack animation={"fade-in 1s"} minH={"100vh"} justify={"stretch"} gap={0}>
      {children}
    </VStack>
  );
}
