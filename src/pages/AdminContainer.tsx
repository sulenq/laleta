import React, { useEffect, useState } from "react";
import useScreenWidth from "../utils/useGetScreenWidth";
import {
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
import { CalendarBlank, House } from "@phosphor-icons/react";
import { ColorModeSwitcher } from "../components/ColorModeSwitcher";
import { Employee, Outlet } from "../types";
import useJwt from "../globalState/useJwt";
import axios from "axios";
import { Link, Navigate, useLocation, useParams } from "react-router-dom";
import { adminNav } from "../const/adminNav";
import ContentSpinner from "../components/ContentSpinner";
import usePayload from "../globalState/usePayload";

export default function AdminContainer({ children }: any) {
  const [outlet, setOutlet] = useState<"loading" | 404 | Outlet>("loading");
  const [employee, setEmployee] = useState<"loading" | 404 | Employee>(
    "loading"
  );
  const jwt = useJwt();
  const user = usePayload();
  const { outletId, employeeId } = useParams();
  const sw = useScreenWidth();
  const today = new Date();
  const formattedToday = `${today.getDate()} ${today.toLocaleString("default", {
    month: "short",
  })}`;
  const location = useLocation();

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
          setOutlet(404);
        }
      } catch (error) {
        console.error(error);
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
          setEmployee(404);
        }
      } catch (error) {
        console.error(error);
      }
    };

    if (jwt) {
      getOutlet();
      getEmployee();
    }
  }, [jwt, employeeId, outletId]);

  if (outlet === 404 || employee === 404) return <Navigate to="/signin" />;

  if (sw < 770)
    return (
      <VStack align={"stretch"} minH={"100vh"} gap={0}>
        {outlet === "loading" || employee === "loading" ? (
          <ContentSpinner />
        ) : (
          <>
            <Container borderBottom={"1px solid var(--divider)"}>
              <HStack py={1} justify={"space-between"}>
                <HStack>
                  <Image src="/logo.svg" w={"15px"} />

                  <Text
                    fontWeight={500}
                    fontSize={11}
                    color={"p.500"}
                    noOfLines={1}
                  >
                    {outlet.outletName}
                  </Text>
                </HStack>

                <HStack mr={-1}>
                  <HStack opacity={0.5} mr={"6px"}>
                    <Icon as={CalendarBlank} fontSize={11} />
                    <Text fontSize={11} noOfLines={1}>
                      {formattedToday}
                    </Text>
                  </HStack>

                  <Link to={"/home"}>
                    <IconButton
                      aria-label="home button"
                      icon={<Icon as={House} />}
                      size={"xs"}
                      variant={"ghost"}
                      className="btn"
                    />
                  </Link>

                  <ColorModeSwitcher size={"xs"} fontSize={13} />
                </HStack>
              </HStack>
            </Container>

            <VStack flex={1} align={"strech"}>
              {children}
            </VStack>
          </>
        )}

        <HStack
          justify={"space-evenly"}
          p={2}
          borderTop={"1px solid var(--divider)"}
          bg={"black"}
        >
          {adminNav.map((n, i) => {
            const pathSegments = location.pathname.split("/");
            const linkSegment = pathSegments[pathSegments.length - 1];
            const isActive = n.linkAlias === linkSegment;

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
                    )}
                  </Center>
                </Link>
              </Tooltip>
            );
          })}
        </HStack>
      </VStack>
    );

  return (
    <VStack align={"stretch"} minH={"100vh"}>
      <Container borderBottom={"1px solid var(--divider)"}>
        <HStack py={2}>
          <Image src="/logo.svg" w={"20px"} />
        </HStack>
      </Container>
    </VStack>
  );
}
