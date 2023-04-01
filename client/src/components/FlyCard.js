import React from "react";
import styled from "styled-components";
import { Link } from 'react-router-dom';


const FlyCard = ({ fly }) => {
  return (
    <Link to={`/fly/${fly._id}`}>
      <Container>
        <Image src={`/images/flies/${fly._id}.png`} alt={fly.flyName} />
        <Name>{fly.flyName}</Name>
        <Type>{fly.typeOfFly}</Type>
      </Container>
    </Link>
  );
};

const Container = styled.div`
  border: 1px solid #ccc;
  background-color: #C6D8CF;
  border-radius: 5px;
  padding: 16px;
  margin: 16px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  max-width: 235px;
  width: 100%;
  box-sizing: border-box;
`;

const Image = styled.img`
  max-width: 200px;
  height: auto;
  margin-bottom: 10px;
`;

const Name = styled.h6`
  margin-bottom: 2px;
  font-size: 18px;
  color: var(--color-text-secondary);
`;

const Type = styled.p`
  font-style: italic;
  color: var(--color-text-secondary);
`;

export default FlyCard;
