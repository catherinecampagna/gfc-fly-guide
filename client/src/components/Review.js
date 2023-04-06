import styled from "styled-components";
import moment from 'moment';

const Review = ({ review }) => {
  const { author, reviewText, date, flyId } = review;

  const formattedDate = moment(date).format('YYYY-MM-DD');

  return (
    <Wrapper>
      <Author>{author}</Author>
      <Date>{formattedDate}</Date>
      <Text>{reviewText}</Text>
      {/* <Fly>{flyId}</Fly> */}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 8px;
  margin-left: 20px;
`;

const Author = styled.span`
  color: grey;
  font-weight: bold;
`;

const Text = styled.p`
  color: black;
  margin: 4px 0;
`;

const Date = styled.span`
  font-size: 12px;
  color: grey;
`;

const Fly = styled.span`
  font-size: 12px;
  color: grey;
`;

export default Review;