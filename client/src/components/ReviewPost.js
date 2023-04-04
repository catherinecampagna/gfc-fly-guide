import { useState, useContext } from "react";
import styled from "styled-components";
import { FiSend } from "react-icons/fi";
import { UserContext } from "../UserContext";

const ReviewPost = ({ flyId, refreshReviews }) => {
  const [reviewText, setReviewText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");


  const { user } = useContext(UserContext);

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsLoading(true);
  
    fetch(`/fly/${flyId}/reviews`, {
      method: "POST",
      body: JSON.stringify({ reviewText, author: user.name }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 400 || data.status === 500) {
          throw new Error("error");
        }
        refreshReviews();
        setReviewText("");
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setError("An error occurred while posting your review. Please try again.");
        setStatus("error");
      });
  };

  return (
    <>
      {user && (
        <Wrapper>
          <Form onSubmit={handleSubmit}>
            <Textarea
              placeholder="Write your review here..."
              value={reviewText}
              onChange={(event) => setReviewText(event.target.value)}
            />
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Posting..." : "Post Review"} <FiSend />
            </Button>
          </Form>
        </Wrapper>
      )}
      {status === "error" && <p>{error}</p>}
    </>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 12px;
  border-radius: 25px;
  margin-bottom: 16px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin-left: 10px;
  width: 90%;
`;

const Textarea = styled.textarea`
  width: 100%;
  height: 80px;
  font-size: 16px;
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 5px;

  &:focus {
    outline: none;
    border: 1px solid black;
  }

  &::placeholder {
    font-family: var(--font-family-body);
    font-size: 16px;
    color: #013926;
  }
`;

const Button = styled.button`
  background-color: black;
  color: white;
  border: none;
  border-radius: 50px;
  padding: 10px 15px;
  `;

export default ReviewPost;
