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
      <RightContainer>
          <Title>Our Top Flies</Title>
        <Click>
          <LoginButton className="button1">Log in</LoginButton>
          <Link to="/topflies">
            <DiscoverButton className="button2">Discover</DiscoverButton>
          </Link>
        </Click>
      </RightContainer>
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

const RightContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #f5fffa;
`;

const Title = styled.h2`
  margin-bottom: 20px;
`;

const Click = styled.div`
  display: flex;
  flex-direction: row;
`;
const LoginButton = styled.button`
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  margin-right: 10px;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  }
`;

const DiscoverButton = styled.button`
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  margin-left: 10px;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  }
`;

export default Footer;
