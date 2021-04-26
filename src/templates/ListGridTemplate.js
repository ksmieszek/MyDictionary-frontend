import styled from "styled-components";

const ListGridTemplate = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 90%;
  max-width: 600px;
  margin-top: 20px;

  @media (min-width: 1440px) {
    display: grid;
    justify-content: center;
    grid-template-columns: 600px 600px;
    grid-template-rows: none;
    column-gap: 10%;
    row-gap: 100px;
    max-width: 100%;
    margin-top: 70px;
  }
`;

export default ListGridTemplate;
