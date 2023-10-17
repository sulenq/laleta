import { Button, Image, Text, VStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <VStack minH={"100vh"} justify={"center"} gap={0} py={12} px={[8]}>
      <Image src="/img/404.png" w={"100%"} maxW={"400px"} mb={4} />
      <Text
        textAlign={"center"}
        fontSize={28}
        fontWeight={800}
        lineHeight={1}
        mb={4}
      >
        404 Page Not Found
      </Text>
      <Text textAlign={"center"} maxW={"400px"} mb={4}>
        You probably mistype the url or the page you're looking for is missing
      </Text>

      <Button
        w={"231px"}
        colorScheme="bnw"
        px={8}
        className="clicky"
        borderRadius={"full"}
        onClick={() => {
          window.history.back();
        }}
        mb={2}
      >
        Back
      </Button>

      <Button
        colorScheme="bnw"
        px={8}
        variant={"ghost"}
        className="btn clicky"
        borderRadius={"full"}
        as={Link}
        to={"/"}
      >
        Back to Landing Page
      </Button>
    </VStack>
  );
}
