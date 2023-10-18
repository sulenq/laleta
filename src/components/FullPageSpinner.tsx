import { Spinner, VStack } from "@chakra-ui/react";

export default function FullPageSpinner() {
  return (
    <VStack justify={"center"} h={"100vh"} w={"100%"}>
      <Spinner size={"lg"} />
    </VStack>
  );
}
