import styled from "styled-components";

const StyleLabelFilter = styled.div`
  padding-bottom: 10px;
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
  .tag {
    padding: 8px 10px;
    display: flex;
    gap: 8px;
    font-size: 0.9rem;
    color: white;
    font-weight: 700;
    border-radius: 3px;
  }
  #spanID_DEPARTAMENTOS {
    background-color: #f25a5a;
  }
  #spanID_MUNICIPIOS {
    background-color: #5fa7e2;
  }
  button {
    cursor: pointer;
  }
  img {
    width: 10px;
    height: 10px;
  }
`;

export {StyleLabelFilter};