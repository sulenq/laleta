import { Box, Center, HStack, Icon, Text } from "@chakra-ui/react";
import { User } from "@phosphor-icons/react";

export default function ProfileSummary(props: any) {
  const user = props?.user;

  return (
    <HStack w={"100%"} maxW={"180px"} flexShrink={1}>
      {user?.image ? (
        <Center
          bg={"var(--divider)"}
          bgImage={user.image}
          bgSize={"cover"}
          bgPos={"top center"}
          w={"40px"}
          h={"40px"}
          borderRadius={"full"}
        />
      ) : (
        <Center
          bg={"var(--divider)"}
          w={"40px"}
          h={"40px"}
          borderRadius={"full"}
        >
          <Icon as={User} fontSize={20} />
        </Center>
      )}

      <Box>
        <Text
          textAlign={"left"}
          fontWeight={600}
          lineHeight={1}
          mb={"2px"}
          noOfLines={1}
        >
          {user?.name}
        </Text>
        <Text
          textAlign={"left"}
          fontSize={[11, null, 13]}
          lineHeight={1}
          opacity={0.5}
        >
          {user?.username}
        </Text>
      </Box>
    </HStack>
  );
}
