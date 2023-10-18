import React, { useEffect, useState } from "react";
import HomeContainer from "../components/HomeContainer";
import NavHeader from "../components/NavHeader";
import Container from "../components/Container";
import {
  Center,
  HStack,
  Icon,
  Image,
  Input,
  SimpleGrid,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Bookmark, GridFour, MapPin, Storefront } from "@phosphor-icons/react";
import { useComponentsBg } from "../const/colorModeValues";
import ContentSpinner from "../components/ContentSpinner";
import axios from "axios";
import useJwt from "../globalState/useJwt";
import useScreenWidth from "../utils/useGetScreenWidth";

export default function Work() {
  const stats = [
    {
      icon: Storefront,
      value: 12,
      name: "total outlet",
      bg: "var(--p500)",
    },
    {
      icon: GridFour,
      value: 4,
      name: "category",
      bg: "var(--cyan)",
    },
    {
      icon: Bookmark,
      value: 4,
      name: "as owner",
      bg: "var(--green)",
    },
  ];
  const cfg = useComponentsBg();
  const jwt = useJwt();
  const [stores, setStores] = useState<any>(null);
  const sw = useScreenWidth();

  useEffect(() => {
    const options = {
      method: "GET",
      baseURL: process.env.REACT_APP_BASE_URL,
      url: "api/outlet-by-user",
      headers: { Authorization: "Bearer " + jwt },
    };

    const getStores = async () => {
      try {
        const response = await axios.request(options);
        console.log(response.data);

        setStores(response.data.stores);
      } catch (error) {
        console.error(error);
      }
    };

    if (jwt) {
      getStores();
    }
  }, [jwt]);

  return (
    <HomeContainer>
      <NavHeader title={"Work"} left={"backButton"} />

      <Container flex={1} pb={4}>
        {/* <Text fontWeight={500} mb={2}>
          Select Outlet
        </Text> */}

        <SimpleGrid
          position={"sticky"}
          top={"60px"}
          columns={[1, null, 2]}
          gap={4}
          alignItems={"center"}
          {...cfg}
        >
          <Input placeholder="Search outlet, e.g Jasmine Kiosk" />

          <SimpleGrid columns={3} mb={4}>
            {stats.map((s, i) => (
              <HStack
                key={i}
                pl={i === 0 ? 2 : 4}
                pr={i === 2 ? 3 : 4}
                py={1}
                justify={"space-between"}
                borderRight={i === 0 ? "1px solid var(--divider)" : 4}
                borderLeft={i === 2 ? "1px solid var(--divider)" : 4}
              >
                <Center p={1} borderRadius={"full"} bg={s.bg}>
                  <Icon as={s.icon} fontSize={21} color={"white"} />
                </Center>

                <VStack align={"flex-end"} gap={0}>
                  <Text
                    fontSize={[17, null, 19]}
                    fontWeight={600}
                    lineHeight={1}
                    mb={"2px"}
                  >
                    {s.value}
                  </Text>
                  <Text
                    flexShrink={0}
                    textAlign={"right"}
                    lineHeight={1}
                    opacity={0.5}
                    fontSize={[11, null, 13]}
                  >
                    {s.name}
                  </Text>
                </VStack>
              </HStack>
            ))}
          </SimpleGrid>
        </SimpleGrid>

        <SimpleGrid columns={sw < 300 ? 1 : [2, 3, 4]} gap={4}>
          {stores &&
            stores?.map((s: any, i: number) => (
              <VStack
                key={i}
                align={"flex-start"}
                cursor={"pointer"}
                transition={"200ms"}
                _hover={{ bg: "var(--divider)" }}
                py={4}
                px={5}
                borderRadius={8}
                border={"1px solid var(--divider3)"}
                className="lg-clicky"
              >
                {s.image ? (
                  <Image
                    borderRadius={"full"}
                    w={"100%"}
                    maxH={"80px"}
                    maxW={"80px"}
                    src={s.image}
                    mb={4}
                  />
                ) : (
                  <Image maxW={"80px"} src={"/logoOutline.svg"} mb={4} />
                )}

                <Text fontSize={[11, null, 13]} opacity={0.5}>
                  {"ID : " + s.id}
                </Text>

                <Text
                  fontWeight={600}
                  fontSize={[17, null, 19]}
                  color={"p.500"}
                >
                  {s.outletName}
                </Text>

                <VStack w={"100%"} align={"flex-start"}>
                  <HStack align={"flex-start"}>
                    <Icon as={GridFour} fontSize={15} mt={"2px"} />
                    <Text noOfLines={2}>{s.category}</Text>
                  </HStack>

                  <HStack align={"flex-start"}>
                    <Icon as={MapPin} fontSize={15} mt={"1px"} />
                    <Text noOfLines={3} fontSize={[11, null, 13]}>
                      {s.address}
                    </Text>
                  </HStack>
                </VStack>
              </VStack>
            ))}
        </SimpleGrid>

        {!stores && <ContentSpinner />}
      </Container>
    </HomeContainer>
  );
}
