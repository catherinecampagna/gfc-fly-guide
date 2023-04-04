import React from "react";
import GlobalStyles from "../GlobalStyles";
import styled from "styled-components";
import { Link } from "react-router-dom";



const Footer = () => {
  return (
    <Container>
      <LeftContainer>
        <Logo
          src="/images/logos/GFC_small_logo.png"
          alt="Logo"/>
      </LeftContainer>
      <GlobalStyles />
    </Container>
  );
};

const Container = styled.section`
  height: 30vh;
  background-image: url("/images/background/GaspeFly-Fly.jpg");
  background-size: cover;
  background-position: center;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 100px;

  @media screen and (max-width: 1000px) {
    flex-direction: column;
  }
`;

const LeftContainer = styled.div`
  flex: 2;
`;

const Logo = styled.img`
  width: 100%;
  max-width: 300px;
`;


export default Footer;
