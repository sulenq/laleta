import React, { useEffect, useState } from "react";
import {
  Center,
  HStack,
  Icon,
  IconButton,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  SimpleGrid,
  Text,
  VStack,
} from "@chakra-ui/react";
import Container from "../components/Container";
import {
  Bookmark,
  GridFour,
  MagnifyingGlass,
  Package,
  X,
} from "@phosphor-icons/react";
import useScreenWidth from "../utils/useGetScreenWidth";
import { RetailProduct } from "../types";
import { useParams } from "react-router-dom";
import ContentSpinner from "../components/ContentSpinner";
import RetailProductListContainerMobile from "./RetailProductListContainerMobile";
import RetailProductListContainer from "./RetailProductListContainer";
import RetailProductListItem from "./RetailProductListItem";
import RetailProductListItemMobile from "./RetailProductListItemMobile";
import TableContainer from "./TableContainer";
import useRetailProducts from "../globalState/useRetailProducts";
import useJwt from "../globalState/useJwt";
import axios from "axios";
import useProductSearch from "../globalState/useProductSearch";

type Props = {
  action: (param: any) => void;
};

export default function RetailProductList({ action }: Props) {
  const sw = useScreenWidth();

  const { retailProducts, setRetailProducts } = useRetailProducts();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<boolean>(false);
  const [notFound, setNotFound] = useState<boolean>(false);
  const { productSearch, setProductSearch } = useProductSearch();

  const stats = [
    {
      icon: Package,
      value: retailProducts?.length || "~",
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

  const { outletId } = useParams();
  const jwt = useJwt();

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);

      const options = {
        method: "GET",
        baseURL: process.env.REACT_APP_API_BASE_URL,
        url: `api/retailproduct-by-outlet/${outletId}`,
        headers: { Authorization: "Bearer " + jwt },
      };

      try {
        const response = await axios.request(options);
        console.log(response.data);

        if (response.data.status === 200) {
          setRetailProducts(response.data.data);
          setLoading(false);
        } else if (response.data.status === 404) {
          setNotFound(true);
        }
      } catch (error) {
        console.log(error);
        setError(true);
      }
    };

    if (jwt) {
      if (!retailProducts) {
        fetch();
      }
    }
  }, [jwt, outletId, retailProducts, setRetailProducts]);

  if (error) {
    return (
      <Container>
        <Text mt={4} textAlign={"center"}>
          Error : Something wrong
        </Text>
      </Container>
    );
  }

  if (notFound) {
    return (
      <Container flex={1} justify={"center"}>
        <Image
          w={"100%"}
          maxW={"250px"}
          mx={"auto"}
          src="/img/noResult.png"
          loading="eager"
        />

        <Text
          textAlign={"center"}
          fontSize={[19, null, 21]}
          fontWeight={500}
          mt={4}
          mb={2}
        >
          No Product
        </Text>

        <Text textAlign={"center"} opacity={0.5} w={"80%"} mx={"auto"}>
          You can add product by clicking Add Product button at the top right of
          the page
        </Text>
      </Container>
    );
  }

  if (retailProducts && !loading) {
    return (
      <>
        <Container>
          <SimpleGrid
            columns={[1, null, 2]}
            gap={4}
            mb={3}
            alignItems={"center"}
          >
            <InputGroup>
              <InputLeftElement>
                <Icon as={MagnifyingGlass} />
              </InputLeftElement>

              <Input
                className="filled"
                placeholder="Search product by code or name"
                value={productSearch}
                pr={"35px !important"}
                onChange={(e) => {
                  setProductSearch(e.target.value);
                }}
              />
              {productSearch && (
                <IconButton
                  aria-label="clear input"
                  icon={<Icon as={X} fontSize={[15, null, 17]} />}
                  size={"xs"}
                  variant={"unstyled"}
                  position={"absolute"}
                  right={1}
                  top={"11px"}
                  zIndex={2}
                  onClick={() => {
                    setProductSearch("");
                  }}
                />
              )}
            </InputGroup>

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
        </Container>

        <TableContainer>
          {sw < 900 ? (
            <RetailProductListContainerMobile>
              {retailProducts.map((p: RetailProduct, i: number) => {
                if (
                  p.code.includes(productSearch.toLocaleLowerCase()) ||
                  p.name.toLowerCase().includes(productSearch.toLowerCase())
                ) {
                  return (
                    <RetailProductListItemMobile
                      key={i}
                      p={p}
                      action={action}
                    />
                  );
                }
                return null;
              })}
            </RetailProductListContainerMobile>
          ) : (
            <RetailProductListContainer>
              {retailProducts.map((p: any, i: number) => {
                if (
                  p.code.includes(productSearch.toLocaleLowerCase()) ||
                  p.name.toLowerCase().includes(productSearch.toLowerCase())
                ) {
                  return (
                    <RetailProductListItem key={i} p={p} action={action} />
                  );
                }
                return null;
              })}
            </RetailProductListContainer>
          )}
        </TableContainer>
      </>
    );
  }

  return <ContentSpinner />;
}
