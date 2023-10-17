import React from "react";
import HomeContainer from "../components/HomeContainer";
import NavHeader from "../components/NavHeader";
import Container from "../components/Container";

export default function Profile() {
  return (
    <HomeContainer>
      <NavHeader title={"Profile"} left={"backButton"} />

      <Container></Container>
    </HomeContainer>
  );
}
