import styled from "styled-components";
import moment from 'moment';

const Review = ({ review }) => {
  const { author, reviewText, date } = review;

  const formattedDate = moment(date).format('YYYY-MM-DD');

  return (
    <Wrapper>
      {author && author.name && <Author>{author.name}</Author>}
      <Text>{reviewText}</Text>
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