import styled from "styled-components";

const Review = ({ review }) => {
  const { author, text, createdAt } = review;

  const formattedDate = new Date(createdAt).toLocaleString();

  return (
    <Wrapper>
      <Author>{author.name}</Author>
      <Text>{text}</Text>
      <Date>{formattedDate}</Date>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 8px;
  border-bottom: 1px solid black;
`;

const Author = styled.span`
  font-weight: bold;
`;

const Text = styled.p`
  margin: 4px 0;
`;

const Date = styled.span`
  font-size: 12px;
  color: grey;
`;

export default Review;