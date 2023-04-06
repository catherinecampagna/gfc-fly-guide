import React, { useState, useEffect } from "react";
import styled from "styled-components";
import FlyCard from "./components/FlyCard";
import { useAuth0 } from '@auth0/auth0-react';
import Sidebar from "./components/Sidebar";


const TopFlies = () => {
  const [flies, setFlies] = useState([]);
  const { user } = useAuth0();

  useEffect(() => {
    async function fetchFlies() {
      const res = await fetch("/flies");
      const data = await res.json();
      console.log(data);
      setFlies(data.data);
    }
    fetchFlies();
  }, []);

  return (
    <Container>
      <LeftContainer>
        <TopLeftContainer>
            <Sidebar />
        </TopLeftContainer>
        <Title>Discover our Top Flies</Title>
      </LeftContainer>
      <RightContainer>
        <FlyCardList>
          {flies.map((fly) => (
            <FlyCard key={fly._id} fly={fly} />
          ))}
        </FlyCardList>
      </RightContainer>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 100px;
  background-color: var(--color-background-secondary);
`;

const LeftContainer = styled.div`
  flex: 1;
  padding: 20px;
  margin-right: 50px;
  width: 25vw;
  display: flex;
  flex-direction: column;;
  justify-content: flex-end;
`;

const TopLeftContainer = styled.div`
  position: fixed;
  top: 100px;
  margin-right: 50px;
  
  @media only screen and (max-width: 768px) { /* for small screens */
  font-size: 16px;
}

@media only screen and (min-width: 768px) and (max-width: 1024px) { /* for medium screens */
font-size: 16px;
}

@media only screen and (min-width: 1024px) { /* for large screens */
font-size: 20px;
}
`;
const Title = styled.h1`;
  font-family: var(--font-family-heading);
  color: #013926;
  position: fixed;
  bottom: 100px;
  width: 25vw;
  margin-right: 50px;

  @media only screen and (max-width: 768px) { /* for small screens */
    font-size: 40px;
  }
  
  @media only screen and (min-width: 800px) and (max-width: 1024px) { /* for medium screens */
    font-size: 50px;
  }
  
  @media only screen and (min-width: 1024px) { /* for large screens */
    font-size: 70px;
  }
`;

const RightContainer = styled.div`
  flex: 3;
  display: flex;
  flex-direction: column;
  background-color: var(--color-background-secondary);
  overflow: scroll;
`;

const FlyCardList = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  & > * {
    flex-basis: calc(25% - 32px);
    margin: 16px;
  }
`;

export default TopFlies;
