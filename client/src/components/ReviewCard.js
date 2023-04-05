import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import ReviewPost from "./ReviewPost";
import Review from "./Review";

const ReviewCard = () => {
  const { id } = useParams();
  const [fly, setFly] = useState(null);

  useEffect(() => {
    fetch(`/fly/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 400 || data.status === 500) {
          throw new Error("Error");
        }
        setFly(data.data);
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
          <ReviewPost flyId={id} />
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