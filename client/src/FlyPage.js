import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Sidebar from "./components/Sidebar";
import ReviewCard from "./components/ReviewCard";


const FlyPage = () => {
  const { id } = useParams();
  const [fly, setFly] = useState(null);

  useEffect(() => {
    fetch(`/fly/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 400 || data.status === 500) {
          throw new Error("Error");
        }
        setFly(data.data);
      });
  }, [id]);

  console.log(fly);
  return (
    <Container>
      {fly ? (
        <>
          <LeftContainer>
             <TopLeftContainer>
          <Sidebar />
        </TopLeftContainer>
        <Title>The {fly.flyName}</Title>
          </LeftContainer>
          <RightContainer>
            <Card>
          <CardLeft> 
            <FlyName>{fly.flyName}</FlyName>
              <Type classname="fly-types">{fly.typeOfFly}</Type>
            <Section>About this fly</Section>
            <Description>{fly.description}</Description>
            <BestFor>
              <Section>Best for</Section>
              <Row>
                <Category>Species</Category>
                <Answer>{fly.targetedFish.join(", ")}</Answer>
              </Row>
              <Row>
                <Category>Water</Category>
                <Answer>{fly.typeOfWater.join(", ")}</Answer>
              </Row>
              <Row>
                <Category>Season</Category>
                <Answer>{fly.seasonality.join(", ")}</Answer>
              </Row>
              <Row>
                <Category>Region</Category>
                <Answer>{fly.regionInCanada.join(", ")}</Answer>
              </Row>
            </BestFor>
            </CardLeft>
            <CardRight><Image src={`/images/flies/${fly._id}.png`} alt={fly.flyName} /></CardRight>
          </Card>
          <ReviewContainer>
            <ReviewCard />
              </ReviewContainer>
          </RightContainer>
         
        </>
      ) : (
        <div>Loading...</div>
      )}
    </Container>
  );
};

const Container = styled.div`
  height: 100vh;
  background-color: #f5fffa;
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding: 100px;
`;

const LeftContainer = styled.div`
  flex: 1;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;

const TopLeftContainer = styled.div`
position: fixed;
  top: 100px;
`;

const ReviewContainer = styled.div`
margin-top: 50px;
overflow: auto;

`;

const Title = styled.h1`
  width: 20%;
  font-family: var(--font-family-heading);
  color: #013926;
  position: fixed;
  bottom: 100px;
`;

const Card = styled.div`
overflow: scroll;
  flex: 1;
display: flex;
border: 1px solid #ccc;
  background-color: #C6D8CF;
  border-radius: 5px;
  padding: 16px;
  height: 550px;
`;

const CardLeft = styled.div`
  flex: 1;

  padding: 20px 50px;
  display: flex;
  flex-direction: column;
  width: 400px;
`;

const BestFor = styled.div`
  color: var(--color-text-secondary);
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: baseline;
  margin-bottom: 5px;
`;

const Category = styled.div`
  font-weight: bold;
  font-size: 16px;
`;

const Section = styled.h6`
  color: var(--color-text-secondary);
  padding-bottom: 10px;
font-style: italic;
`;

const CardRight = styled.div`
  flex: 1;

  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: left;
`;

const FlyName = styled.h4`
  margin-bottom: 2px;
  color: var(--color-text-secondary);
`;

const Type = styled.p`
  margin-bottom: 50px;
  font-style: italic;
  font-size: 20px;
  color: var(--color-text-secondary);
`;

const Answer = styled.p`
  color: var(--color-text-secondary);
  margin-left: 16px;
`;
const Image = styled.img`
  width: 450px;
`;

const Description = styled.p`
  margin-bottom: 80px;
  color: var(--color-text-secondary);
`;

const RightContainer = styled.div`
  flex: 3;
  display: flex;
  flex-direction: column;
  background-color: var(--color-background-secondary);
  overflow: scroll;
`;


export default FlyPage;
