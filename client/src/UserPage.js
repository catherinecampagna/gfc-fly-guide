import React, { useContext } from "react";
import styled from "styled-components";
import Sidebar from "./components/Sidebar";
import { UserContext } from "./UserContext";

const UserPage = () => {
  const { user } = useContext(UserContext);

  return (
    <Container>
      <LeftContainer>
        <TopLeftContainer>
          <Sidebar />
        </TopLeftContainer>
        <Title>Your Fly Box</Title>
      </LeftContainer>
      <RightContainer>
        <ReviewedSection>
          {user.reviews.length > 0 ? (
            <div>
              <h2>Your reviewed flies:</h2>
              <ul>
                {user.reviews.map((review) => (
                  <li key={review.flyId}>{review.comment}</li>
                ))}
              </ul>
            </div>
          ) : (
            <p>You have not reviewed any flies yet.</p>
          )}
        </ReviewedSection>
        <FavouriteSection>
          {user.favoriteFlies.length > 0 ? (
            <div>
              <h2>Your favourite flies:</h2>
              <ul>
                {user.favoriteFlies.map((flyId) => (
                  <li key={flyId}>{flyId}</li>
                ))}
              </ul>
            </div>
          ) : (
            <p>You have not added any flies to your favourites yet.</p>
          )}
        </FavouriteSection>
      </RightContainer>
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

const ReviewedSection = styled.div`
  font-family: var(--font-family-heading);
  color: #013926;
`;

const FavouriteSection = styled.div`
  font-family: var(--font-family-heading);
  color: #013926;
`;


export default UserPage;
