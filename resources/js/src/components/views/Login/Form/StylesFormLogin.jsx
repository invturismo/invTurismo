import styled from "styled-components";

const ContainerForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  color: white;
  label {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }
  input {
    cursor: text;
    padding: 10px;
    border-bottom: 1px solid white;
  }
  input::placeholder {
    color: #ffffffa6;
  }
  span {
    display: block;
    font-weight: 600;
  }
  .errorMessage {
    text-align: center;
    align-self: center;
    color: rgb(217 58 89);
  }
  button,
  .LoaderForm {
    margin-top: 10px;
    align-self: center;
    width: max-content;
  }
`;

export { ContainerForm };
