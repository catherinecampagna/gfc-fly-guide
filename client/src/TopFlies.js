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
            <FlyCard key={fly.id} fly={fly} />
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
  display: flex;
  flex-direction: column;
  flex: 1;
`;
const TopLeftContainer = styled.div`
position: fixed;
  top: 100px;
`;

const BackLink = styled.a`
  display: flex;
  align-items: center;
  color: #013926;
  margin-bottom: 16px;
  text-decoration: none;
`;

const HiButton = styled.button`
  margin-top: auto;
  padding: 12px 16px;
  background-color: #013926;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
`;

const Title = styled.h1`
  width: 20%;
  font-family: var(--font-family-heading);
  color: #013926;
  position: fixed;
  bottom: 100px;
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
