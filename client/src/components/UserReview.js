import { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import moment from 'moment';
import { UserContext } from "../UserContext";

const UserReview = () => {
  const [reviews, setReviews] = useState([]);
  const { currentUser } = useContext(UserContext);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await fetch(`/user/${currentUser.email}/reviews`);
        const data = await res.json();
        setReviews(data.data);
      } catch (error) {
        console.error(error);
      }
    };

    if (currentUser) {
      fetchReviews();
    }
  }, [currentUser]);
  return (
    <>
       {reviews.map(review => (
        <Wrapper key={review._id}>
          <FlyName>{review.flyName ? review.flyName.flyName : "Unknown fly"}</FlyName>
          <Date>{moment(review.date).format('YYYY-MM-DD')}</Date>
          <Text>{review.reviewText}</Text>
        </Wrapper>
      ))}
    </>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 8px;
  margin-left: 20px;
`;

const FlyName = styled.span`
  color: grey;
  font-weight: bold;
  text-decoration: underline;
`;

const Text = styled.p`
  color: black;
  margin: 4px 0;
`;

const Date = styled.span`
  font-size: 12px;
  color: grey;
`;

export default UserReview;