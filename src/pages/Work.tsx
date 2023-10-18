import React, { useEffect } from "react";
import HomeContainer from "../components/HomeContainer";
import NavHeader from "../components/NavHeader";
import Container from "../components/Container";
import {
  HStack,
  Icon,
  Input,
  SimpleGrid,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Bookmark, GridFour, Storefront } from "@phosphor-icons/react";
import { useComponentsBg } from "../const/colorModeValues";
import ContentSpinner from "../components/ContentSpinner";
import axios from "axios";
import useJwt from "../globalState/useJwt";

export default function Work() {
  const stats = [
    {
      icon: Storefront,
      value: 12,
      name: "total outlet",
    },
    {
      icon: GridFour,
      value: 4,
      name: "category",
    },
    {
      icon: Bookmark,
      value: 4,
      name: "as owner",
    },
  ];
  const cfg = useComponentsBg();
  const jwt = useJwt();

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
                <Icon as={s.icon} fontSize={29} opacity={0.5} />

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

        <ContentSpinner />
      </Container>
    </HomeContainer>
  );
}
