import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import ReviewPost from "./ReviewPost";
import Review from "./Review";

const ReviewCard = () => {
  const { id } = useParams();
  const [fly, setFly] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch reviews
  useEffect(() => {
    setIsLoading(true);
    fetch(`/fly/${id}/reviews`)
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 400 || data.status === 500) {
          throw new Error("Error");
        }
        setFly(data.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setError("An error occurred while loading reviews.");
        setIsLoading(false);
      });
  }, [id, refresh]);

  // Handle new Review
  const handleReviewAdded = (newFlyData) => {
    setFly(newFlyData);
    setRefresh(!refresh);
  };

  return (
    <Wrapper>
      <CardTitle>Reviews</CardTitle>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          {error ? (
            <div>{error}</div>
          ) : (
            <>
              {fly && fly.reviews.length > 0 ? (
                fly.reviews.map((review) => (
                  <Review key={review._id} review={review} />
                ))
              ) : (
                <div>No reviews yet for this fly.</div>
              )}
              <ReviewPost
                flyId={id}
                refresh={refresh}
                setRefresh={setRefresh}
                onReviewAdded={handleReviewAdded}
              />
            </>
          )}
        </>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  border: 1px solid #ccc;
  background-color: #c6d8cf;
  border-radius: 5px;
  padding: 20px 40px;
  margin-bottom: 100px;
`;

const CardTitle = styled.h6`
  color: var(--color-text-secondary);
  font-style: italic;
  padding: 20px 30px 16px;
  border-bottom: 1px #013926 solid;
`;

export default ReviewCard;
