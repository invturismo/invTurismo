import styled from "styled-components";

const StyleFilter = styled.div`
  padding-bottom: 10px;
  form {
    display: flex;
    justify-content: space-between;
    gap: 15px;
    flex-wrap: wrap;
    align-items: center;
  }
  .Options {
    display: flex;
    gap: 10px;
  }
  select {
    background-color: #2c1742eb;
    width: 150px;
    color: white;
    padding: 3px 5px;
    border-radius: 3px;
    cursor: pointer;
    font-family: inherit;
    font-size: 0.8rem;
    option {
      background-color: white;
      color: #15012e;
    }
    option:disabled {
      color: #130522b3;
    }
  }
  select:disabled {
    position: relative;
    opacity: 0.5;
  }
  .filterButton{
    font-size: 0.9rem;
  }
  .filterButton span {
    padding: 8px 10px;
  }
  .filterButton img {
    width: 15px;
    height: 15px;
  }
`;

export { StyleFilter };