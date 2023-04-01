import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { Link } from "react-router-dom";

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
            <Link to="/topflies">
              <BackButton className="button3">Back</BackButton>
            </Link>
          </LeftContainer>
          <Card>
          <MiddleContainer>
            <FlyMain>
              <FlyName>{fly.flyName}</FlyName>
              <Type classname="fly-types">{fly.typeOfFly}</Type>
            </FlyMain>
            <BestFor>
              <Title>Best for</Title>
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
            <Title>About this fly</Title>
            <Description>{fly.description}</Description>
          </MiddleContainer>
          <RightContainer>
            <Image src={`/images/flies/${fly._id}.png`} alt={fly.flyName} />
          </RightContainer>
          </Card>
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

const Card = styled.div`
  flex: 1;

display: flex;
border: 1px solid #ccc;
  background-color: #C6D8CF;
  border-radius: 5px;
  padding: 16px;
  height: 550px;
`;

const MiddleContainer = styled.div`
  flex: 1;

  padding: 20px 50px;
  display: flex;
  flex-direction: column;
  width: 400px;
`;

const FlyMain = styled.div``;

const BestFor = styled.div`
  color: var(--color-text-secondary);
  margin-bottom: 50px;
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

const Title = styled.h6`
  color: var(--color-text-secondary);
  padding-bottom: 10px;
font-style: italic;
`;

const RightContainer = styled.div`
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

const BackButton = styled.button`
  color: var(--color-text-secondary);
  font-family: var(--font-family-body);
  font-weight: 300;
  border: 1px solid var(--color-text-secondary);
  font-family: var(--font-family-body);
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  position: fixed;
  bottom: 100px;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  }
`;

export default FlyPage;
