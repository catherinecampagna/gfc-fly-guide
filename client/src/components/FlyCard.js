import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import { FiHeart } from "react-icons/fi";
import { Link } from "react-router-dom";
import { UserContext } from "../UserContext";

const FlyCard = ({ fly }) => {
  // State to track whether the fly is a favorite of the current user
  const { currentUser } = useContext(UserContext);
  const [isFavorite, setIsFavorite] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if the current user has marked the fly as a favorite
    if (currentUser) {
      setIsFavorite(currentUser.favoriteFlies.includes(fly._id));
    }
  }, [currentUser, fly._id]);

  // Function to update the user's favorite flies
  const updateFavorites = async (flyId) => {
    try {
        const res = await fetch(`/user/${currentUser.email}/favoriteFlies`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ flyId: flyId }),
        });
        const data = await res.json();
        console.log("response:", data);
    
    } catch (error) {
      console.error(error);
    }
  };

  // Handle click event on the heart icon to mark or unmark the fly as a favorite
  const handleFavoriteClick = () => {
    setIsFavorite(!isFavorite);
    if (currentUser) {
      updateFavorites(fly._id);
    }
  };

  const handleImageLoad = () => {
    setLoading(false);
  };

  return (
    <Container>
      <Link to={`/fly/${fly._id}`}>
        <Image
          src={`/images/flies/${fly._id}.png`}
          alt={fly.flyName}
          onLoad={handleImageLoad}
        />
      </Link>
      {loading ? (
        <LoadingText>Loading...</LoadingText>
      ) : (
        <>
          <Link to={`/fly/${fly._id}`}>
            <CardContent>
              <Name>{fly.flyName}</Name>
              <Type>{fly.typeOfFly}</Type>
            </CardContent>
          </Link>
          <HeartContainer onClick={handleFavoriteClick} isFavorite={isFavorite}>
            <HeartIcon  />
          </HeartContainer>
        </>
      )}
    </Container>
  );
};

const Container = styled.div`
  border: 1px solid #ccc;
  background-color: #c6d8cf;
  border-radius: 5px;
  padding: 16px;
  margin: 16px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  max-width: 235px;
  width: 100%;
  box-sizing: border-box;
  position: relative;
`;

const Image = styled.img`
  max-width: 200px;
  height: auto;
  margin-bottom: 10px;
`;

const LoadingText = styled.p`
  margin-bottom: 2px;
  font-size: 18px;
  color: var(--color-text-secondary);
`;

const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
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

const HeartContainer = styled.div`
  position: absolute;
  bottom: 8px;
  right: 8px;
  cursor: pointer;
color: ${(props) => (props.isFavorite ? "red" : "gray")};
`;

const HeartIcon = styled(FiHeart)`
`;

export default FlyCard;
