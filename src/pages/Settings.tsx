import React from "react";
import HomeContainer from "../components/HomeContainer";
import NavHeader from "../components/NavHeader";
import Container from "../components/Container";

export default function Settings() {
  return (
    <HomeContainer>
      <NavHeader title={"Settings"} left={"backButton"} />

      <Container></Container>
    </HomeContainer>
  );
}
