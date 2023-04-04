import React, { useContext, useState, useEffect } from "react";
import styled from "styled-components";
import Sidebar from "./components/Sidebar";
import { UserContext } from "./UserContext";
import FlyCard from "./components/FlyCard";

const UserPage = () => {
  const { user } = useContext(UserContext);
  const [favoriteFlies, setFavoriteFlies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserFavorites = async () => {
      try {
        setLoading(true); // Set loading state to true
        const response = await fetch(`/user/${user.email}/favoriteFlies`);
        const data = await response.json();
        const favoriteFliesWithId = data.favoriteFlies.map((fly) => ({
          ...fly,
          _id: fly.flyId,
        }));
        setFavoriteFlies(favoriteFliesWithId);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false); // Set loading state to false
      }
    };

    if (user) {
      fetchUserFavorites();
    }
  }, [user]);

  return (
    <Container>
      <LeftContainer>
        <TopLeftContainer>
          <Sidebar />
        </TopLeftContainer>
        <Title>Your Fly Box</Title>
      </LeftContainer>
      <RightContainer>
        <FavouriteSection>
          {loading ? (
            <p>Loading...</p>
          ) : favoriteFlies && favoriteFlies.length > 0 ? (
            <div>
              <h2>Your favourite flies:</h2>
              <ul>
                {favoriteFlies.map((fly) => (
                  <FlyCard key={fly._id} fly={fly} />
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

const FavouriteSection = styled.div`
  font-family: var(--font-family-heading);
  color: #013926;
`;

export default UserPage;
