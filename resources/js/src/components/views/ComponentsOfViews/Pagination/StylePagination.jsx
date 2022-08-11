import styled from "styled-components";

const StylePagination = styled.div`
  padding: 10px 0;
  display: flex;
  justify-content: center;
  gap: 5px;
  & > div {
    display: flex;
    gap: 5px;
  }
  span {
    width: 35px;
    height: 35px;
    display: grid;
    place-items: center center;
    border-radius: 8px;
    font-size: 1.2rem;
    font-weight: 900;
  }
  span:not(.nullSpan) {
    cursor: pointer;
  }
  span:hover:not(.nullSpan):not(.ActiveSpan) {
    background-color: #8080804f;
  }
  img {
    width: 20px;
    height: 20px;
  }
  .next > img {
    transform: rotateY(180deg);
  }
  .ActiveSpan {
    background-color: #220646;
    color: white;
  }
`;

export { StylePagination };