import React, { useState } from "react";
import styled from "styled-components";
import FlyCard from "./FlyCard";
import { FiSend } from "react-icons/fi";

const Questionnaire = () => {
  const [region, setRegion] = useState("");
  const [season, setSeason] = useState("");
  const [species, setSpecies] = useState("");
  const [water, setWater] = useState("");
  const [submitEnabled, setSubmitEnabled] = useState(false);
  const [recommendations, setRecommendations] = useState([]);

  const handleSubmit = async () => {
    // Fetch fly data from backend
    const response = await fetch("/flies");
    const { data: flies } = await response.json();
    console.log("flies:", flies);

    // Generate matches based on user input
    const matches = flies.filter((fly) => {
      return (
        fly.regionInCanada.includes(region) &&
        fly.seasonality.includes(season) &&
        fly.targetedFish.includes(species) &&
        fly.typeOfWater.includes(water)
      );
    });

    if (matches.length < 1) {
      console.log("Not enough matches");
      return;
    }

    const randomIndex1 = Math.floor(Math.random() * matches.length);
    let randomIndex2;
    do {
      randomIndex2 = Math.floor(Math.random() * matches.length);
    } while (randomIndex2 === randomIndex1);

    const randomMatches = [matches[randomIndex1], matches[randomIndex2]];
    console.log("randomMatches:", randomMatches);

    setSubmitEnabled(true);
    setRecommendations(randomMatches);
  };

  const isFormComplete = region && season && species && water;

  return (
    <Container id="questionnaire">
      <LeftContainer>
        {submitEnabled ? (
          <Title>Our recommendations</Title>
        ) : (
          <Title>Tell us about your next fishing trip</Title>
        )}
        {submitEnabled && (
          <FlycardsContainer>
            {recommendations.map((fly) => (
              <FlyCard key={fly._id} fly={fly} />
            ))}
          </FlycardsContainer>
        )}
      </LeftContainer>
      <RightContainer>
        <Question>
          <Prompt>Where in Canada?</Prompt>
          <Dropdown
            value={region}
            onChange={(event) => {
              setRegion(event.target.value);
              setSubmitEnabled(false);
            }}
          >
            <option value="">Select region</option>
            <option value="Atlantic Canada">Atlantic Canada</option>
            <option value="Eastern Canada">Eastern Canada</option>
            <option value="Central Canada">Central Canada</option>
            <option value="Western Canada">Western Canada</option>
            <option value="Pacific Northwest">Pacific Northwest</option>
            <option value="Northern Canada">Northern Canada</option>
          </Dropdown>
        </Question>
        <Question>
          <Prompt>When is it?</Prompt>
          <Dropdown
            value={season}
            onChange={(event) => {
              setSeason(event.target.value);
              setSubmitEnabled(false);
            }}
          >
            <option value="">Select season</option>
            <option value="Spring">Spring</option>
            <option value="Summer">Summer</option>
            <option value="Fall">Fall</option>
            <option value="Winter">Winter</option>
          </Dropdown>
        </Question>
        <Question>
          <Prompt>What type of fish?</Prompt>
          <Dropdown
            value={species}
            onChange={(event) => {
              setSpecies(event.target.value);
              setSubmitEnabled(false);
            }}
          >
            <option value="">Select species</option>
            <option value="Atlantic Salmon">Atlantic Salmon</option>
            <option value="Steelhead">Steelhead</option>
            <option value="Salmon">Salmon</option>
            <option value="Trout">Trout</option>
            <option value="Bass & Striped Bass">Striped Bass</option>
          </Dropdown>
        </Question>
        <Question>
          <Prompt>What type of water?</Prompt>
          <Dropdown
            value={water}
            onChange={(event) => {
              setWater(event.target.value);
              setSubmitEnabled(false);
            }}
          >
            <option value="">Select water</option>
            <option value="Rivers and streams">Rivers and streams</option>
            <option value="Stillwater">Stillwater</option>
            <option value="Saltwater">Saltwater</option>
          </Dropdown>
        </Question>
        <SubmitButton
          disabled={!isFormComplete || submitEnabled}
          onClick={handleSubmit}
        >
          {submitEnabled ? (
            "Tight Lines!"
          ) : (
            <>
              Submit <FiSend /> 
            </>
          )}
        </SubmitButton>
      </RightContainer>
      <LowerLeftContainer></LowerLeftContainer>
    </Container>
  );
};

const Container = styled.div`
  height: 70vh;
  background-color: #013926;
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding: 100px;
`;

const LeftContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 2;
  margin-right: 50px;
`;

const FlycardsContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 16px;
  margin-top: 16px;
`;

const RightContainer = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
  justify-items: center;
  width: fit-content;
`;

const LowerLeftContainer = styled.div``;

const Question = styled.div`
  display: flex;
  flex-direction: row;
  align-items: baseline;
  padding: 30px 0 15px 20px;
  border-top: 1px solid rgba(245, 255, 250, 0.5);
  &:last-of-type {
    border-bottom: 1px solid rgba(245, 255, 250, 0.5);
  }
`;

const Title = styled.h1`
  margin-bottom: 32px;
  font-family: var(--font-family-heading);
`;

const Prompt = styled.p`
  font-size: 20px;
`;

const Dropdown = styled.select`
  background-color: #013926;
  border-color: rgba(245, 255, 250, 0.5);
  width: 250px;
  border-radius: 5px;
  margin-bottom: 15px;
  padding: 16px;
  text-align: center;
  color: #f5fffa;
  margin-left: auto;
`;

const SubmitButton = styled.button`
  background-color: ${({ disabled }) =>
    disabled ? "rgba(255, 255, 255, 0.5)" : "#fff"};
  border: none;
  color: #013926;
  padding: 16px;
  border-radius: 5px;
  font-weight: bold;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  margin-top: auto;
  margin-bottom: 16px;
  text-align: center;
`;

export default Questionnaire;
