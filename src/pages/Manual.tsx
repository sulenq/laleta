import React from "react";
import HomeContainer from "../components/HomeContainer";
import NavHeader from "../components/NavHeader";
import Container from "../components/Container";

export default function Manual() {
  return (
    <HomeContainer>
      <NavHeader title={"Manual"} left={"backButton"} />

      <Container></Container>
    </HomeContainer>
  );
}
