import styled from "styled-components";

const StyleGeneralGetRecord = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 30px 10px;
  .GeneralGetRecord {
    display: flex;
    flex-direction: column;
    gap: 20px;
    width: 95%;
    max-width: 980px;
    margin: 0 auto;
  }
  h2 {
    width: fit-content;
    margin: 0 auto 10px;
    padding-bottom: 5px;
    border-bottom: 3px solid #2206467a;
    text-transform: uppercase;
    font-size: 2.3rem;
    font-family: ${(props) => props.theme.fonts.secondary};
  }
  h3 {
    font-size: 2rem;
    align-self: center;
    color: #2e144c;
    text-align: center;
  }
  h4 {
    font-size: 1.5rem;
    color: #220646;
  }
  h5 {
    font-size: 1.3rem;
    font-weight: 500;
  }
  h3,
  h4,
  h5 {
    font-family: ${(props) => props.theme.fonts.secondary};
  }
  .GetContainerTittle {
    display: flex;
    flex-direction: column;
    gap: 18px;
  }
  .GetInformation1,
  .GetInformationImages,
  .GetInformation2 {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }
  .GetInformation1 p {
    flex-grow: 1;
    display: flex;
    align-items: center;
    font-size: 1.1rem;
  }
  .NoneP {
    align-self: center;
  }
  .ContainerCodigoInformation p {
    font-size: 1.3rem;
    text-align: center;
    letter-spacing: 1px;
  }
  .ContainerGet1 {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(290px, 1fr));
    gap: 14px;
  }
  .TotalStyle {
    grid-column: 1 / -1;
  }
  .TotalStyle b {
    font-family: ${(props) => props.theme.fonts.secondary};
  }
  .TotalStyle p {
    font-size: 1.1rem;
  }
  .GetInformation2 ul {
    list-style-type: disclosure-closed;
  }
  .GetInformation2 ul li::marker {
    color: #2e144c;
  }
  .GetInformation2 p {
    font-size: 1.1rem;
    text-align: center;
  }
  img {
    width: 100%;
    max-width: 400px;
    margin: 0 auto;
    height: auto;
    border-radius: 8px;
  }
  .TableInformation {
    border-radius: 8px;
    position: relative;
    overflow: hidden;
  }
  .TableInformation::before {
    content: "";
    display: block;
    position: absolute;
    inset: 0;
    z-index: 2;
    border-radius: 8px;
    border: 2px solid #15012e;
  }
  .RowInformation {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  }
  .RowInformation div {
    border: 1px solid #15012e;
    padding: 7px;
    display: flex;
  }
  .RowInformation span {
    position: relative;
    z-index: 3;
    font-size: 1rem;
  }
  .titleRow {
    font-weight: 700;
    font-family: ${(props) => props.theme.fonts.secondary};
  }
  .contentRow {
    margin: 0 auto;
  }
  .ContainerButtons {
    margin-top: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    gap: 10px;
  }
`;

export { StyleGeneralGetRecord };
