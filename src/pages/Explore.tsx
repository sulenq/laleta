import React from "react";
import HomeContainer from "../components/HomeContainer";
import NavHeader from "../components/NavHeader";
import Container from "../components/Container";

export default function Explore() {
  return (
    <HomeContainer>
      <NavHeader title={"Explore"} left={"backButton"} />

      <Container></Container>
    </HomeContainer>
  );
}
