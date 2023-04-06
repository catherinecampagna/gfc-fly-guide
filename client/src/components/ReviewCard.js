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
  }, [id]);

  return (
    <Wrapper>
      {fly ? (
        <>
          {fly.reviews.length > 0 ? (
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
            onReviewAdded={setFly}
          />
        </>
      ) : (
        <div>Loading...</div>
      )}
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
