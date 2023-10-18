import React, { useState, useEffect } from "react";
import HomeContainer from "../components/HomeContainer";
import NavHeader from "../components/NavHeader";
import Container from "../components/Container";
import { Image, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import useJwt from "../globalState/useJwt";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function WorkSelectRole() {
  const jwt = useJwt();
  const [outlet, setOutlet] = useState<any>();
  const { outletId } = useParams();
  useEffect(() => {
    const options = {
      method: "GET",
      baseURL: process.env.REACT_APP_BASE_URL,
      url: "api/outlet/" + outletId,
      headers: { Authorization: "Bearer " + jwt },
    };

    const getOutlet = async () => {
      try {
        const response = await axios.request(options);
        console.log(response.data);

        setOutlet(response.data.outlet);
      } catch (error) {
        console.error(error);
      }
    };

    if (jwt) {
      getOutlet();
    }
  }, [jwt]);

  return (
    <HomeContainer>
      <NavHeader title={"Select Role"} left="backButton" backPath={"/work"} />

      <Container flex={1}>
        <VStack py={4}>
          {outlet?.image ? (
            <Image
              borderRadius={"full"}
              w={"100%"}
              maxH={"80px"}
              maxW={"80px"}
              src={outlet?.image}
              mb={4}
            />
          ) : (
            <Image maxW={"80px"} src={"/logoOutline.svg"} mb={4} />
          )}

          <Text fontWeight={600} fontSize={[17, null, 19]} color={"p.500"}>
            {outlet?.outletName}
          </Text>

          <SimpleGrid columns={[2, null, 4]}>
            
          </SimpleGrid>
        </VStack>
      </Container>
    </HomeContainer>
  );
}
