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
          <FlyName href={`/fly/${review.flyName._id}`}>
            {review.flyName ? review.flyName.flyName : "Unknown fly"}
          </FlyName>
          <Date>Posted on{moment(review.date).format(" DD-MM-YYYY")}</Date>
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
            <DeleteButton onClick={() => handleDeleteReview(review._id)}>
              Delete
            </DeleteButton>
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
  font-size: 18px;
  font-family: var(--font-family-body);
  font-weight: var(--font-weight-bold);
  cursor: pointer;
`;

const Text = styled.p`
  font-size: 16px;
  margin: 4px 0;
  font-family: var(--font-family-body);
  color: var(--color-text-secondary);
`;

const Date = styled.span`
  font-size: 12px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 8px;
`;

const Button = styled.button`
  margin: 4px 4px;
  background-color: #013926;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 4px 8px;
  cursor: pointer;
  font-size: 11px;
  &:hover {
    opacity: 0.8;
  }
`;

const DeleteButton = styled.button`
  margin: 4px 4px;
  background-color: transparent;
  border: 1px #013926 solid;
  color: #013926;
  border-radius: 4px;
  padding: 4px 8px;
  cursor: pointer;
  font-size: 11px;
  &:hover {
    border: 1px red solid;
    color: red;
  }
`;

const EditWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const EditInput = styled.textarea`
  height: 100px;
`;

const EditButton = styled(Button)`
  margin-top: 10px;
`;

const CancelButton = styled(Button)`
  margin-top: 4px;
  background-color: transparent;
  border: 1px #013926 solid;
  color: #013926;
  &:hover {
    border: 1px #013926 solid;
    color: #013926;
  }
`;

export default UserReview;
