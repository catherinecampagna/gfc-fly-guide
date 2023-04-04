import { useState, useEffect } from "react";
import styled from "styled-components";
import Review from "./Review";
import ReviewPost from "./ReviewPost";

const ReviewCard = ({ flyId }) => {
  const [reviews, setReviews] = useState([]);
  const [status, setStatus] = useState("idle");
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    fetch(`/fly/${flyId}/reviews`)
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 400 || data.status === 500) {
          throw new Error("error");
        }
        setReviews(data);
        setStatus("active");
      })
      .catch((error) => {
        console.log(error);
        setStatus("error");
      });
  }, [refresh]);

  const refreshReviews = () => {
    setRefresh(!refresh);
  };

  return (
    <Wrapper>
      {status === "idle" ? (
        <div>Loading reviews...</div>
        ) : status === "error" ? (
          <div>Failed to load reviews.</div>
          ) : reviews.length > 0 ? (
            reviews.map((review) => <Review key={review.id} review={review} />)
            ) : (
              <div>No reviews yet for this fly.</div>
              )}
              <ReviewPost flyId={flyId} refreshReviews={refreshReviews} />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  overflow: scroll;
  flex: 1;
  display: flex;
  flex-direction: column;
  border: 1px solid #ccc;
  background-color: #c6d8cf;
  border-radius: 5px;
  padding: 16px;
`;

export default ReviewCard;
