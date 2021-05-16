import styled from "styled-components";
import UserPageTemplate from "templates/UserPageTemplate";
import MoreOptionsDialog from "components/atoms/MoreOptionsDialog";
import GoBackButton from "components/atoms/GoBackButton";

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 800px;
`;

const StyledHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 90%;

  @media (min-width: 1024px) {
    width: 80%;
  }
`;

const StyledTitle = styled.h1`
  max-width: 80%;
  font-size: 2.1rem;
  font-family: "Rubik", sans-serif;
  font-weight: 400;
  word-wrap: break-word;

  @media (min-width: 1024px) {
    font-size: 2.4rem;
  }
`;

const StyledListItem = styled.div`
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #ddd;
  }
`;

const StyledGoBackButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 90%;
  margin-top: 50px;
`;

const DetailsTemplate = ({ title, route, children, setActionName, setIsOpen }) => {
  return (
    <UserPageTemplate>
      <StyledWrapper>
        <StyledHeader>
          <StyledTitle>{title}</StyledTitle>
          <MoreOptionsDialog>
            <StyledListItem
              onClick={() => {
                setActionName("edit");
                setIsOpen(true);
              }}
            >
              edytuj
            </StyledListItem>
            <StyledListItem
              onClick={() => {
                setActionName("delete");
                setIsOpen(true);
              }}
            >
              usuń
            </StyledListItem>
          </MoreOptionsDialog>
        </StyledHeader>
        {children}
        <StyledGoBackButtonWrapper>
          <GoBackButton route={route} />
        </StyledGoBackButtonWrapper>
      </StyledWrapper>
    </UserPageTemplate>
  );
};

export default DetailsTemplate;
