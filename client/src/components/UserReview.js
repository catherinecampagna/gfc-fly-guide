import { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import moment from "moment";
import { UserContext } from "../UserContext";

const UserReview = () => {
  const [reviews, setReviews] = useState([]);
  const [editingReviewId, setEditingReviewId] = useState(null);
  const [editingReviewText, setEditingReviewText] = useState("");
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

  const handleEditReview = async (reviewId, newReviewText) => {
    try {
      await fetch(`/review/${reviewId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ reviewText: newReviewText }),
      });
      setReviews((prevReviews) =>
        prevReviews.map((review) =>
          review._id === reviewId
            ? { ...review, reviewText: newReviewText }
            : review
        )
      );
      setEditingReviewId(null);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteReview = async (reviewId) => {
    try {
      await fetch(`/review/${reviewId}`, {
        method: "DELETE",
      });
      setReviews((prevReviews) =>
        prevReviews.filter((review) => review._id !== reviewId)
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditButtonClick = (reviewId) => {
    setEditingReviewId(reviewId);
  };

  const handleCancelButtonClick = () => {
    setEditingReviewId(null);
  };

  return (
    <>
      {reviews.map((review) => (
        <Wrapper key={review._id}>
          {/* <FlyName href={`/fly/${review.flyName._id}`}>
            {review.flyName ? review.flyName.flyName : "Unknown fly"}
          </FlyName> */}
          <Date>{moment(review.date).format("YYYY-MM-DD")}</Date>
          {editingReviewId === review._id ? (
            <EditWrapper>
              <EditInput
                defaultValue={review.reviewText}
                onChange={(e) => setEditingReviewText(e.target.value)}
              />
              <EditButton
                onClick={() => handleEditReview(review._id, editingReviewText)}
              >
                Save
              </EditButton>
              <CancelButton onClick={handleCancelButtonClick}>
                Cancel
              </CancelButton>
            </EditWrapper>
          ) : (
            <Text>{review.reviewText}</Text>
          )}
          <ButtonWrapper>
            {editingReviewId === review._id ? null : (
              <Button onClick={() => handleEditButtonClick(review._id)}>
                Edit
              </Button>
            )}
            <Button onClick={() => handleDeleteReview(review._id)}>
              Delete
            </Button>
          </ButtonWrapper>
        </Wrapper>
      ))}
    </>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid #ccc;
  background-color: #c6d8cf;
  border-radius: 5px;
  padding: 16px;
  margin: 16px;
`;

const FlyName = styled.a`
  margin-bottom: 2px;
  color: var(--color-text-secondary);
  text-decoration: underline;
  font-size: 20px;
  font-family: var(--font-family-body);
  font-weight: var(--font-weight-bold);
  cursor: pointer;
`;

const Text = styled.p`
  color: black;
  margin: 4px 0;
`;

const Date = styled.span`
  font-size: 12px;
  color: grey;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 8px;
`;

const Button = styled.button`
  background-color: #013926;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 4px 8px;
  cursor: pointer;
  font-size: 14px;
  &:hover {
    opacity: 0.8;
  }
`;

const EditWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const EditInput = styled.textarea`
  height: 50px;
  resize: none;
`;

const EditButton = styled(Button)`
  margin-top: 8px;
`;

const CancelButton = styled(Button)`
  background-color: #ccc;
  &:hover {
    background-color: #ccc;
    opacity: 0.8;
  }
`;

export default UserReview;
