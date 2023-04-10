import styled from "styled-components";
import moment from 'moment';

const Review = ({ review }) => {
  const { author, reviewText, date } = review;

  const formattedDate = moment(date).format('DD-MM-YYYY');

  return (
    <Wrapper>
      <Author>{author}</Author>
      <Date>Posted on {formattedDate}</Date>
      <Text>{reviewText}</Text>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px;
  margin: 16px;
`;

const Author = styled.span`
  margin-bottom: 2px;
  color: var(--color-text-secondary);
  font-size: 16px;
  font-family: var(--font-family-body);
  font-weight: var(--font-weight-bold);
`;

const Text = styled.p`
  font-size: 16px;
  margin: 4px 0;
  font-family: var(--font-family-body);
  color: var(--color-text-secondary);
`;

const Date = styled.span`
font-size: 12px;
color: var(--color-text-secondary);
`;

export default Review;