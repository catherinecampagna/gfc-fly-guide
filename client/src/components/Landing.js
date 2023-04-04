import React, { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-scroll";
import styled from "styled-components";
import GlobalStyles from "../GlobalStyles";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <Button className="button1" onClick={() => loginWithRedirect()}>
      Log In
    </Button>
  );
};

const createUser = async (email, name) => {
  console.log("createUser called with", email, name);

  const response = await fetch("/user/:_id", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      name,
    }),
  });
  const data = await response.json();
  console.log("createUser response", data);

  return data;
};

const Landing = ({ onLogin }) => {
  const { isAuthenticated, user, logout } = useAuth0();

  useEffect(() => {
    if (isAuthenticated && user.email && user.name) {
      console.log("email:", user.email);
      console.log("name:", user.name);
      createUser(user.email, user.name);
      onLogin();
    }
  }, [isAuthenticated, onLogin, user]);

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
        {isAuthenticated ? (
          <>
            <LoginCard>
              <CardTitle>Hi, {user.name}!</CardTitle>
              <ButtonContainer>
                <ScrollButton
                  className="button1"
                  to="questionnaire"
                  smooth={true}
                  duration={500}
                >
                  Find the perfect fly
                </ScrollButton>
                <Button className="button1" href="/topflies">
                  Browse our Top Flies
                </Button>
                <Button className="button1" href="/flybox">
                  Go to your Fly Box
                </Button>
              </ButtonContainer>
                <LogoutLink
                  href="#"
                  onClick={() => logout({ returnTo: window.location.origin })}
                >
                  Log Out
                </LogoutLink>
            </LoginCard>
          </>
        ) : (
          <PreLoginCard>
            <DescriptionDark>
              Log in to discover:
              <br></br>- Personalized fly recommendations
              <br></br>- Browse our top flies
              <br></br>- Review and keep tabs of you favourites
            </DescriptionDark>
            <LoginButton />
          </PreLoginCard>
        )}
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
  @media screen and (max-width: 1000px) {
    flex-direction: column;
  }
`;

const LeftContainer = styled.div`
  flex: 1;
  margin: 100px;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 10px;
`;

const LogoutLink = styled.a`
  color: #013926;
  font-size: 16px;
  cursor: pointer;
  text-decoration: underline;
  margin-left: auto;
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

const CardTitle = styled.p`
  font-size: 36px;
  font-style: italic;
  color: #013926 ;
`;

const Description = styled.p`
  font-size: 18px;
  margin-bottom: 32px;
  text-align: center;
`;

const PreLoginCard = styled.div`
  background-color: #c6d8cf;
  border-radius: 5px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 400px;
  height: 225px;
`;

const DescriptionDark = styled.p`
  color: #013926;
  font-size: 14px;
  margin-bottom: 32px;
  text-align: center;
  font-family: var(--font-family-other);
`;
const LoginCard = styled.div`
  background-color: #c6d8cf;
  border-radius: 5px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 400px;
  height: auto;
`;

const ScrollButton = styled(Link)`
  margin-top: 4px;
  margin-bottom: 4px;
font-size: 16px;
padding: 15px;
width: 230px;
  cursor: pointer;
  transition: all 0.3s ease-in-out;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  }
`;

const Button = styled.a`
  margin-top: 4px;
  margin-bottom: 4px;
font-size: 16px;
padding: 15px;
width: 230px;
  cursor: pointer;
  transition: all 0.3s ease-in-out;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  }
`;

export default Landing;
