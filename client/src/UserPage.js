import React, { useContext, useState, useEffect } from "react";
import styled from "styled-components";
import Sidebar from "./components/Sidebar";
import { UserContext } from "./UserContext";
import FlyCard from "./components/FlyCard";

const UserPage = () => {
  const { currentUser } = useContext(UserContext);
  const [favoriteFlies, setFavoriteFlies] = useState([]);
  const [loading, setLoading] = useState(true);
  // Fetch the user document
  useEffect(() => {
    const fetchUser = async () => {
      try {
    
        const flyPromises = currentUser.favoriteFlies.map(async (id) => {
          const res = await fetch(`/fly/${id}`);
          const data = await res.json();
          return data.data;
        });
        Promise.all(flyPromises).then((flies) => setFavoriteFlies(flies));
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    if (currentUser) {
      setLoading(true);
      fetchUser();
    }
  }, [currentUser]);

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
          ) : (
            <>
              {currentUser.favoriteFlies.length && (
                <div>
                  <h2>Your favourite flies:</h2>
                  <ul>
                    {favoriteFlies.map((fly) => {
                      return <FlyCard key={fly._id} fly={fly} />;
                    })}
                  </ul>
                </div>
              )}

              {!currentUser.favoriteFlies.length && (
                <p>You have not added any flies to your favourites yet.</p>
              )}
            </>
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
