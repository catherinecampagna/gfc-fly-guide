import React from "react";
import { Link } from "react-scroll";
import styled from "styled-components";
import GlobalStyles from "../GlobalStyles";

const Landing = () => {
  return (
    <Container>
      <LeftContainer>
        <Logo src="/images/logos/GFC_header_logo.png" alt="Logo" />
      </LeftContainer>
      <RightContainer>
        <Text>
          <Title>Hook your dream catch.</Title>
          <Description>
            We are Canada's leading fishing fly distributor.
            <br></br>
            Let us guide you to find the perfect fly for your next catch.
          </Description>
        </Text>
        <ScrollButton
          className="button1"
          to="questionnaire"
          smooth={true}
          duration={500}
        >
          Take the quiz
        </ScrollButton>
      </RightContainer>
      <GlobalStyles />
    </Container>
  );
};

const Container = styled.section`
  height: 100vh;
  background-image: url("/images/background/GaspeFly_Truite.jpg");
  background-size: cover;
  background-position: center;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  @media screen and (max-width: 1000px){
    flex-direction: column;
  }
    
`;

const LeftContainer = styled.div`
  flex: 1;
  margin: 100px;
`;

const Logo = styled.img`
  width: 100%;
  max-width: 1000px;
  height: auto;
`;

const RightContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #f5fffa;
  margin: 100px;
`;

const Text = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Title = styled.p`
  font-size: 36px;
  font-style: italic;
  margin-bottom: 12px;
`;

const Description = styled.p`
  font-size: 18px;
  margin-bottom: 32px;
  text-align: center;
`;

const ScrollButton = styled(Link)`
  cursor: pointer;
  transition: all 0.3s ease-in-out;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  }
`;

export default Landing;
