import React, { useEffect, useState } from "react";
import useScreenWidth from "../utils/useGetScreenWidth";
import {
  Badge,
  Box,
  Button,
  Center,
  HStack,
  Icon,
  IconButton,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  Tooltip,
  VStack,
} from "@chakra-ui/react";
import Container from "./Container";
import {
  ArrowClockwise,
  CalendarBlank,
  DotsThreeOutline,
  HouseSimple,
  IdentificationBadge,
} from "@phosphor-icons/react";
import { ColorModeSwitcher } from "./ColorModeSwitcher";
import { Link, useNavigate, useParams } from "react-router-dom";
import ContentSpinner from "./ContentSpinner";
import usePayload from "../globalState/usePayload";
import ProfileSummary from "./ProfileSummary";
import { useComponentsBg } from "../const/colorModeValues";
import useJwt from "../globalState/useJwt";
import axios from "axios";
import useWorkOutlet from "../globalState/useWorkOutlet";
import SignOutModal from "./SignOutModal";
import { cashierNav } from "../const/cashierNav";
import { iconSize } from "../const/sizes";
import FullPageSpinner from "./FullPageSpinner";
import { removeCookie } from "typescript-cookie";

export default function CashierContainer({ activeNav, children }: any) {
  const { outlet, employee, setOutlet, setEmployee } = useWorkOutlet();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<boolean>(false);
  const user = usePayload();
  const { outletId, employeeId } = useParams();
  const sw = useScreenWidth();
  const today = new Date();
  const formattedToday = `${today.getDate()} ${today.toLocaleString("default", {
    month: "short",
  })}`;
  const cfg = useComponentsBg();
  const jwt = useJwt();
  const navigate = useNavigate();

  useEffect(() => {
    const fetch = async () => {
      const options = {
        method: "GET",
        baseURL: process.env.REACT_APP_API_BASE_URL,
        url: `api/work/${user?.id}/${outletId}/${employeeId}`,
        headers: { Authorization: "Bearer " + jwt },
      };

      try {
        setLoading(true);
        const response = await axios.request(options);
        console.log(response.data);

        if (response.data.status === 200) {
          if (response.data.data.employee.role !== "Cashier") {
            removeCookie("_auth");
            removeCookie("_authState");
            navigate("/signin");
          }

          setOutlet(response.data.data.outlet);
          setEmployee(response.data.data.employee);
        } else if (response.data.status === 404) {
          navigate("/signin");
        }
      } catch (error) {
        console.log(error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    if (outletId && employeeId) {
      if (jwt) {
        if (
          !outlet ||
          outletId !== outlet?.id ||
          !employee ||
          employeeId !== employee?.id
        ) {
          fetch();
        }
      }
    }
  }, [
    activeNav,
    jwt,
    user?.id,
    outletId,
    outlet,
    employeeId,
    employee,
    setOutlet,
    setEmployee,
    navigate,
  ]);

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
                    icon={<Icon as={HouseSimple} fontSize={[15, null, 17]} />}
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

        <VStack flex={1} align={"strech"} gap={0}>
          {children}
        </VStack>
      </>
    );
  };

  if (error) {
    return (
      <Container>
        <Text mt={4} textAlign={"center"}>
          Error : Something wrong
        </Text>
      </Container>
    );
  }

  if (outlet && employee && !loading) {
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
            zIndex={99}
          >
            {cashierNav.map((n, i) => {
              const isActive = n.linkAlias === activeNav;

              return (
                <Tooltip key={i} label={n.name}>
                  <Link
                    to={`/work/${outletId}/${employeeId}/Cashier/${n.linkAlias}`}
                  >
                    <Center
                      p={"6px"}
                      bg={isActive ? n.bg : ""}
                      _hover={{ bg: n.bg }}
                      cursor={"pointer"}
                      transition={"200ms"}
                      borderRadius={"full"}
                    >
                      <Icon as={n.icon} fontSize={23} color={"white"} />
                    </Center>
                  </Link>
                </Tooltip>
              );
            })}

            <Menu isLazy>
              <MenuButton
                as={IconButton}
                aria-label="more nav"
                className="btn"
                variant={"ghost"}
                w={"35px"}
                h={"35px"}
                icon={
                  <Icon as={DotsThreeOutline} color={"white"} fontSize={21} />
                }
                borderRadius={"full"}
                size={"sm"}
              >
                <HStack>
                  <Center
                    p={1}
                    cursor={"pointer"}
                    transition={"200ms"}
                    borderRadius={"full"}
                  >
                    <Icon as={DotsThreeOutline} fontSize={17} />
                  </Center>

                  <Text fontWeight={500}>More</Text>
                </HStack>
              </MenuButton>

              <MenuList
                id="moreNav"
                borderRadius={8}
                border={"1px solid var(--divider2)"}
                mb={4}
                mr={-4}
              >
                <MenuItem as={Link} to={"/home"}>
                  <HStack cursor={"pointer"}>
                    <Icon as={HouseSimple} fontSize={iconSize} />

                    <Text>Home</Text>
                  </HStack>
                </MenuItem>

                <MenuItem as={Link} to={"/work"}>
                  <HStack cursor={"pointer"}>
                    <Icon as={IdentificationBadge} fontSize={[19, null, 21]} />

                    <Text>Work</Text>
                  </HStack>
                </MenuItem>

                <Box w={"100%"} h={"3px"} bg={"var(--divider)"} />

                <VStack py={3} px={3}>
                  <ProfileSummary user={user} maxW={"none"} />

                  <SignOutModal w={"100%"} size={"sm"} mt={2} />
                </VStack>
              </MenuList>
            </Menu>
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
          maxW={"240px"}
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

            {cashierNav.map((n, i) => {
              const isActive = n.linkAlias === activeNav;

              return n.name === "Profile" ? (
                ""
              ) : (
                <HStack
                  key={i}
                  as={Link}
                  to={`/work/${outletId}/${employeeId}/Cashier/${n.linkAlias}`}
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
            <Menu>
              <MenuButton
                as={Button}
                className="btn"
                variant={"ghost"}
                w={"100%"}
                p={"6px"}
                borderRadius={"full"}
                _hover={{ bg: "var(--divider)" }}
                transition={"200ms"}
                cursor={"pointer"}
              >
                <HStack>
                  <Center
                    p={1}
                    cursor={"pointer"}
                    transition={"200ms"}
                    borderRadius={"full"}
                  >
                    <Icon as={DotsThreeOutline} fontSize={17} />
                  </Center>

                  <Text fontWeight={500}>More</Text>
                </HStack>
              </MenuButton>

              <MenuList id="moreNav" borderRadius={8} {...cfg} minW={"208px"}>
                <MenuItem as={Link} to={"/home"}>
                  <HStack cursor={"pointer"}>
                    <Icon as={HouseSimple} fontSize={[19, null, 21]} />

                    <Text>Home</Text>
                  </HStack>
                </MenuItem>

                <MenuItem as={Link} to={"/work"}>
                  <HStack cursor={"pointer"}>
                    <Icon as={IdentificationBadge} fontSize={[19, null, 21]} />

                    <Text>Work</Text>
                  </HStack>
                </MenuItem>

                <Box w={"100%"} h={"3px"} bg={"var(--divider)"} />

                <VStack py={3} px={4}>
                  <ProfileSummary user={user} />

                  <SignOutModal w={"100%"} size={"sm"} mt={2} />
                </VStack>
              </MenuList>
            </Menu>
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
        >
          <Content />
        </VStack>
      </HStack>
    );
  }

  return <FullPageSpinner />;
}
