import React, { useEffect, useState } from "react";
import HomeContainer from "../components/HomeContainer";
import NavHeader from "../components/NavHeader";
import Container from "../components/Container";
import {
  Badge,
  Box,
  Center,
  HStack,
  Icon,
  Image,
  Input,
  SimpleGrid,
  Text,
  VStack,
} from "@chakra-ui/react";
import {
  Bookmark,
  GridFour,
  MapPin,
  Pulse,
  Storefront,
} from "@phosphor-icons/react";
import { useComponentsBg } from "../const/colorModeValues";
import ContentSpinner from "../components/ContentSpinner";
import axios from "axios";
import useJwt from "../globalState/useJwt";
import useScreenWidth from "../utils/useGetScreenWidth";
import { Link } from "react-router-dom";
import useWorkOutletsSearch from "../globalState/useWorkOutletsSearch";
import { Work } from "../types";

export default function WorkOutlets() {
  const cfg = useComponentsBg();
  const jwt = useJwt();
  const [workOutlets, setWorkOutlets] = useState<"loading" | Work[] | 404>(
    "loading"
  );
  const stats = [
    {
      icon: Storefront,
      value: typeof workOutlets === "object" ? workOutlets?.length : "~",
      name: "total",
      bg: "var(--p500)",
    },
    {
      icon: GridFour,
      value: "~",
      name: "no info",
      bg: "var(--cyan)",
    },
    {
      icon: Bookmark,
      value: "~",
      name: "no info",
      bg: "var(--green)",
    },
  ];
  const sw = useScreenWidth();
  const { workOutletsSearch, setWorkOutletsSearch } = useWorkOutletsSearch();

  useEffect(() => {
    const options = {
      method: "GET",
      baseURL: process.env.REACT_APP_BASE_URL,
      url: "api/outlet-by-user",
      headers: { Authorization: "Bearer " + jwt },
    };

    const getOutlets = async () => {
      try {
        const response = await axios.request(options);
        console.log(response.data);

        if (response.data.status === 200) {
          setWorkOutlets(response.data.data);
        } else if (response.data.status === 404) {
          setWorkOutlets(404);
        }
      } catch (error) {
        console.error(error);
      }
    };

    if (jwt) {
      getOutlets();
    }
  }, [jwt]);

  return (
    <HomeContainer>
      <NavHeader
        title={"Work Outlets"}
        left={"backButton"}
        backPath={"/home"}
      />

      <Container flex={1} pb={4}>
        <SimpleGrid
          // position={"sticky"}
          // zIndex={99}
          // top={"60px"}
          py={1}
          columns={[1, null, 2]}
          gap={4}
          alignItems={"center"}
          {...cfg}
          mb={3}
        >
          <Input
            placeholder="Search outlet, e.g Jasmine Kiosk"
            className="filled"
            variant={"filled"}
            onChange={(e) => {
              setWorkOutletsSearch(e.target.value);
            }}
            value={workOutletsSearch}
          />

          <SimpleGrid columns={3} gap={6}>
            {stats.map((s, i) => (
              <HStack key={i} py={1} justify={"space-between"}>
                <Center p={1} borderRadius={"full"} bg={s.bg}>
                  <Icon as={s.icon} fontSize={21} color={"white"} />
                </Center>

                <VStack align={"flex-end"} gap={0}>
                  <Text fontWeight={600} lineHeight={1} mb={"2px"}>
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

        {workOutlets === "loading" && <ContentSpinner />}

        {workOutlets === 404 && (
          <VStack flex={1} py={4}>
            <Text>You're curently not employed to any outlets</Text>
          </VStack>
        )}

        {typeof workOutlets === "object" && (
          <SimpleGrid columns={sw < 300 ? 1 : [2, 2, 3, 4]} gap={4}>
            {workOutlets
              ?.filter((d: Work) =>
                d.outlet.outletName
                  .toLocaleLowerCase()
                  .includes(workOutletsSearch.toLocaleLowerCase())
              )
              ?.map((s, i) => (
                <VStack
                  as={Link}
                  to={`/work/${s.outlet.id}/${s.employee.id}/${s.employee.role}/dashboard`}
                  key={i}
                  // align={"flex-start"}
                  cursor={"pointer"}
                  transition={"200ms"}
                  _hover={{
                    bg: "var(--divider)",
                  }}
                  borderRadius={8}
                  border={"1px solid var(--divider)"}
                  className="lg-clicky"
                >
                  <VStack p={4} pb={0}>
                    {s.outlet.image ? (
                      <Box
                        bgImage={s.outlet.image}
                        bgSize={"cover"}
                        bgPos={"center"}
                        w={"85px"}
                        h={"85px"}
                        borderRadius={"full"}
                        mb={4}
                      />
                    ) : (
                      <Image maxW={"80px"} src={"/logo.svg"} mb={4} />
                    )}

                    <Text fontSize={[11, null, 13]} opacity={0.5}>
                      {"ID : " + s.outlet.id}
                    </Text>

                    <Text
                      fontWeight={600}
                      fontSize={[17, null, 19]}
                      color={"p.500"}
                    >
                      {s.outlet.outletName}
                    </Text>

                    <Badge
                      fontSize={[11, null, 13]}
                      colorScheme={
                        s.employee.role === "Admin" ? "purple" : "yellow"
                      }
                    >
                      {s.employee.role}
                    </Badge>
                  </VStack>

                  <VStack
                    w={"100%"}
                    align={"flex-start"}
                    p={3}
                    borderRadius={6}
                  >
                    <HStack align={"flex-start"}>
                      <Icon as={Pulse} fontSize={15} mt={"2px"} />
                      <Text noOfLines={2}>{s.employee.status}</Text>
                    </HStack>

                    <HStack align={"flex-start"}>
                      <Icon as={Storefront} fontSize={15} mt={"2px"} />
                      <Text noOfLines={2}>{s.outlet.category}</Text>
                    </HStack>

                    <HStack align={"flex-start"}>
                      <Icon as={MapPin} fontSize={15} mt={"1px"} />
                      <Text noOfLines={3} fontSize={[11, null, 13]}>
                        {s.outlet.address}
                      </Text>
                    </HStack>
                  </VStack>
                </VStack>
              ))}
          </SimpleGrid>
        )}
      </Container>
    </HomeContainer>
  );
}
