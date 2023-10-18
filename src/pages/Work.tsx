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
import { WorkOutlets } from "../types";

export default function Work() {
  const cfg = useComponentsBg();
  const jwt = useJwt();
  const [data, setData] = useState<"loading" | WorkOutlets[] | 404>("loading");
  const stats = [
    {
      icon: Storefront,
      value: typeof data === "object" ? data?.length : "~",
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
          setData(response.data.data);
        } else if (response.data.status === 404) {
          setData(404);
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

      <Container flex={1} pb={4} py={1}>
        {/* <Text fontWeight={500} mb={2}>
          Select Outlet
        </Text> */}

        <SimpleGrid
          position={"sticky"}
          zIndex={99}
          top={"60px"}
          columns={[1, null, 2]}
          gap={4}
          alignItems={"center"}
          {...cfg}
          mb={[null, null, 4]}
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

        {data === "loading" && <ContentSpinner />}

        {data === 404 && (
          <VStack flex={1} py={4}>
            <Text>You're curently not employed to any outlets</Text>
          </VStack>
        )}

        {typeof data === "object" && (
          <SimpleGrid columns={sw < 300 ? 1 : [2, 2, 3, 4]} gap={4}>
            {data
              ?.filter((d: WorkOutlets) =>
                d.outlet.outletName
                  .toLocaleLowerCase()
                  .includes(workOutletsSearch.toLocaleLowerCase())
              )
              ?.map((s: any, i: number) => (
                <VStack
                  as={Link}
                  to={"/work/" + s.employee.role}
                  key={i}
                  // align={"flex-start"}
                  cursor={"pointer"}
                  transition={"200ms"}
                  _hover={{
                    bg: "linear-gradient(to top, var(--divider), transparent)",
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
