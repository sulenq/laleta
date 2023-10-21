import React, { useEffect, useState } from "react";
import useScreenWidth from "../utils/useGetScreenWidth";
import {
  Badge,
  Box,
  Center,
  HStack,
  Icon,
  IconButton,
  Image,
  Text,
  Tooltip,
  VStack,
} from "@chakra-ui/react";
import Container from "../components/Container";
import { ArrowClockwise, CalendarBlank, House } from "@phosphor-icons/react";
import { ColorModeSwitcher } from "../components/ColorModeSwitcher";
import { Employee, Outlet } from "../types";
import useJwt from "../globalState/useJwt";
import axios from "axios";
import { Link, Navigate, useParams } from "react-router-dom";
import { adminNav } from "../const/adminNav";
import ContentSpinner from "../components/ContentSpinner";
import usePayload from "../globalState/usePayload";
import ProfileSummary from "../components/ProfileSummary";
import { useComponentsBg } from "../const/colorModeValues";

export default function AdminContainer({ activeNav, children }: any) {
  const [outlet, setOutlet] = useState<Outlet | null>(null);
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>(null);

  const jwt = useJwt();
  const user = usePayload();
  const { outletId, employeeId } = useParams();
  const sw = useScreenWidth();
  const today = new Date();
  const formattedToday = `${today.getDate()} ${today.toLocaleString("default", {
    month: "short",
  })}`;
  const cfg = useComponentsBg();

  useEffect(() => {
    const getOutletOptions = {
      method: "GET",
      baseURL: process.env.REACT_APP_BASE_URL,
      url: "api/outlet/" + outletId,
      headers: { Authorization: "Bearer " + jwt },
    };

    const getOutlet = async () => {
      try {
        const response = await axios.request(getOutletOptions);
        console.log(response.data);

        if (response.data.status === 200) {
          setOutlet(response.data.outlet);
        } else if (response.data.status === 404) {
          return <Navigate to="/signin" />;
        }
      } catch (error) {
        console.error(error);
        setError(error);
      }
    };

    const getEmployeeOptions = {
      method: "GET",
      baseURL: process.env.REACT_APP_BASE_URL,
      url: "api/employee/" + employeeId,
      headers: { Authorization: "Bearer " + jwt },
    };

    const getEmployee = async () => {
      try {
        const response = await axios.request(getEmployeeOptions);
        console.log(response.data);

        if (response.data.status === 200) {
          setEmployee(response.data.employee);
        } else if (response.data.status === 404) {
          <Navigate to="/signin" />;
        }

        setLoading(false);
      } catch (error) {
        console.error(error);
        setError(error);
      }
    };

    if (jwt) {
      getOutlet();
      getEmployee();
    }
  }, [jwt, employeeId, outletId]);

  const Content = () => {
    return loading ? (
      <ContentSpinner />
    ) : (
      <>
        <Container
          position={"sticky"}
          zIndex={99}
          top={0}
          borderBottom={"1px solid var(--divider)"}
          {...cfg}
        >
          <HStack py={1} justify={"space-between"}>
            <HStack>
              {sw < 770 ? <Image src="/logo.svg" w={"15px"} /> : ""}

              <Text
                fontWeight={500}
                fontSize={[11, null, 13]}
                color={"p.500"}
                noOfLines={1}
              >
                {outlet?.outletName}
              </Text>

              <Badge fontSize={[9, null, 11]} colorScheme={employee?.roleColor}>
                {employee?.role}
              </Badge>
            </HStack>

            <HStack mr={-1}>
              <HStack opacity={0.5} mr={"6px"}>
                <Icon as={CalendarBlank} fontSize={11} />
                <Text fontSize={11} noOfLines={1}>
                  {formattedToday}
                </Text>
              </HStack>

              <Tooltip label={"Home"} openDelay={500}>
                <Link to={"/home"}>
                  <IconButton
                    aria-label="home button"
                    icon={<Icon as={House} fontSize={[15, null, 17]} />}
                    size={"xs"}
                    variant={"ghost"}
                    className="btn"
                  />
                </Link>
              </Tooltip>

              <Tooltip label={"Refresh"} openDelay={500}>
                <IconButton
                  aria-label="refresh button"
                  icon={<Icon as={ArrowClockwise} fontSize={[15, null, 17]} />}
                  size={"xs"}
                  onClick={() => {
                    window.location.reload();
                  }}
                  className="btn"
                  variant={"ghost"}
                />
              </Tooltip>

              <ColorModeSwitcher size={"xs"} fontSize={[15, null, 17]} />
            </HStack>
          </HStack>
        </Container>

        <VStack flex={1} align={"strech"} gap={0} animation={"fade-in 200ms"}>
          {children}
        </VStack>
      </>
    );
  };

  if (error) {
    return <Text>Error : {error.message}</Text>;
  }

  if (sw < 900) {
    return (
      <VStack align={"stretch"} minH={"100vh"} gap={0}>
        <Content />

        <HStack
          justify={"space-evenly"}
          p={2}
          borderTop={"1px solid var(--divider)"}
          bg={"black"}
          position={"sticky"}
          bottom={0}
        >
          {adminNav.map((n, i) => {
            const isActive = n.linkAlias === activeNav;

            return (
              <Tooltip key={i} label={n.name}>
                <Link
                  to={`/work/${outletId}/${employeeId}/Admin/${n.linkAlias}`}
                >
                  <Center
                    p={"6px"}
                    bg={isActive ? n.bg : ""}
                    _hover={{ bg: n.bg }}
                    cursor={"pointer"}
                    transition={"200ms"}
                    borderRadius={"full"}
                  >
                    {n.name === "Profile" ? (
                      user?.image ? (
                        <Box
                          w={"25px"}
                          h={"25px"}
                          bgImage={user?.image}
                          bgSize={"cover"}
                          bgPos={"top center"}
                          borderRadius={"full"}
                        />
                      ) : (
                        <Icon as={n.icon} fontSize={23} color={"white"} />
                      )
                    ) : (
                      <Icon as={n.icon} fontSize={23} color={"white"} />
                    )}
                  </Center>
                </Link>
              </Tooltip>
            );
          })}
        </HStack>
      </VStack>
    );
  }

  return (
    <HStack
      align={"flex-start"}
      minH={"100vh"}
      w={"100%"}
      maxW={"1280px"}
      mx={"auto"}
    >
      <VStack
        w={"100%"}
        h={"100vh"}
        maxW={"200px"}
        pt={8}
        pb={4}
        px={4}
        justify={"space-between"}
        align={"stretch"}
        position={"sticky"}
        top={0}
        overflow={"auto"}
      >
        <VStack gap={0}>
          <Image w={"40px"} src="/logo.svg" mb={2} />
          <Text fontWeight={800} mb={8}>
            LALETA
          </Text>

          {adminNav.map((n, i) => {
            const isActive = n.linkAlias === activeNav;

            return n.name === "Profile" ? (
              ""
            ) : (
              <HStack
                key={i}
                as={Link}
                to={`/work/${outletId}/${employeeId}/Admin/${n.linkAlias}`}
                w={"100%"}
                p={"6px"}
                borderRadius={"full"}
                bg={isActive ? "var(--divider)" : ""}
                _hover={{ bg: "var(--divider)" }}
                transition={"200ms"}
                mb={3}
              >
                <Center
                  p={1}
                  bg={n.bg}
                  cursor={"pointer"}
                  transition={"200ms"}
                  borderRadius={"full"}
                >
                  <Icon as={n.icon} fontSize={17} color={"white"} />
                </Center>

                <Text fontWeight={500}>{n.name}</Text>
              </HStack>
            );
          })}
        </VStack>

        <VStack>
          <ProfileSummary user={user} />
        </VStack>
      </VStack>

      <VStack
        w={"100%"}
        minH={"100vh"}
        flex={1}
        gap={0}
        align={"stretch"}
        borderLeft={"1px solid var(--divider)"}
        borderRight={"1px solid var(--divider)"}
        animation={"fade-in 200ms"}
      >
        <Content />
      </VStack>
    </HStack>
  );
}
