import React, { useContext, useState, useEffect } from "react";
import styled from "styled-components";
import Sidebar from "./components/Sidebar";
import { UserContext } from "./UserContext";
import FlyCard from "./components/FlyCard";
import Review from "./components/Review";

const UserPage = () => {
  const { currentUser } = useContext(UserContext);
  const [favoriteFlies, setFavoriteFlies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reviews, setReviews] = useState([]);

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

        const reviewRes = await fetch("/reviews");
        const reviewData = await reviewRes.json();
        console.log(reviewData);

        const userReviews = reviewData.data.filter(
          (review) => review.author === currentUser.name
        );
        setReviews(userReviews);
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
                <FlySection>
                  <h3>Your favourite flies</h3>
                  <FlyGrid>
                    {favoriteFlies.map((fly) => {
                      return <FlyCard key={fly._id} fly={fly} />;
                    })}
                  </FlyGrid>
                </FlySection>
              )}

              {!currentUser.favoriteFlies.length && (
                <p>You have not added any flies to your favourites yet.</p>
              )}

              {!currentUser.favoriteFlies.length && (
                <p>You have not added any flies to your favourites yet.</p>
              )}

              {reviews.length && (
                <ReviewSection>
                  <h3>Your reviews</h3>
                  {reviews.map((review) => {
                    return <Review key={review._id} review={review} />;
                  })}
                </ReviewSection>
              )}

              {!reviews.length && <p>You have not written any reviews yet.</p>}
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
  margin-right: 50px;
  width: 25vw;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;

const TopLeftContainer = styled.div`
  position: fixed;
  top: 100px;
  margin-right: 50px;

  @media only screen and (max-width: 768px) {
    /* for small screens */
    font-size: 16px;
  }

  @media only screen and (min-width: 768px) and (max-width: 1024px) {
    /* for medium screens */
    font-size: 16px;
  }

  @media only screen and (min-width: 1024px) {
    /* for large screens */
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

  @media only screen and (max-width: 768px) {
    /* for small screens */
    font-size: 40px;
  }

  @media only screen and (min-width: 800px) and (max-width: 1024px) {
    /* for medium screens */
    font-size: 50px;
  }

  @media only screen and (min-width: 1024px) {
    /* for large screens */
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

const FavouriteSection = styled.div`
  font-family: var(--font-family-heading);
  color: #013926;
`;

const FlySection = styled.div`
  font-family: var(--font-family-heading);
  color: #013926;
  display: flex;
  flex-direction: column;
`;

const FlyGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  & > * {
    flex-basis: calc(25% - 32px);
  }
`;

const ReviewSection = styled.div`
  font-family: var(--font-family-heading);
  color: #013926;
  display: flex;
  flex-direction: column;
`;

const ReviewCard = styled.div``;

export default UserPage;
