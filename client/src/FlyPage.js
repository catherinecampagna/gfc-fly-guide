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
              <CardRight>
                <Image src={`/images/flies/${fly._id}.png`} alt={fly.flyName} />
              </CardRight>
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
  height: auto;
  background-color: #f5fffa;
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding: 100px;
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

const Title = styled.h1`
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

const ReviewContainer = styled.div`
  margin-top: 50px;
  height: auto;

  `;

const Card = styled.div`
  flex: 1;
  display: flex;
  border: 1px solid #ccc;
  background-color: #c6d8cf;
  border-radius: 5px;
  padding: 16px;
  height: auto;
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

  @media only screen and (max-width: 768px) { /* for small screens */
  width: 250px;
  }
  
  @media only screen and (min-width: 768px) and (max-width: 1024px) { /* for medium screens */
  width: 250px;
  }
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
  height: auto;
`;

export default FlyPage;
