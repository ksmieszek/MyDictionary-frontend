import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { deleteTexts } from "actions/index";
import routes from "routes/index";
import styled from "styled-components";
import DetailsTemplate from "templates/DetailsTemplate";
import ModalTemplate from "templates/ModalTemplate";
import TextForm from "components/molecules/forms/TextForm";
import PreformattedText from "components/atoms/PreformattedText";
import Button from "components/atoms/Button";

const StyledLanguage = styled.h2`
  max-width: 80%;
  margin-top: 40px;
  font-family: "Rubik", sans-serif;
  font-size: 1.8rem;
  font-weight: 400;
  text-align: center;
  word-wrap: break-word;

  @media (min-width: 1024px) {
    font-size: 2rem;
  }
`;

const StyledParagraph = styled.p`
  font-size: 1.6rem;
  line-height: 1.5;
`;

const StyledButton = styled(Button)`
  margin-top: 30px;
`;

const TextsDetails = (props) => {
  const [state, setState] = useState({});
  const [actionName, setActionName] = useState(undefined);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (props.texts) {
      const { _id: id, firstText, secondText, firstLanguage, secondLanguage, title } = props.texts;
      const { languages, activeLanguageFirst } = props;
      let firstLanguageName = languages.find((item) => item._id === firstLanguage).name;
      let secondLanguageName = languages.find((item) => item._id === secondLanguage).name;
      let textFromFirstLanguage = firstText;
      let textFromSecondLanguage = secondText;
      if (activeLanguageFirst.languageId === secondLanguage) {
        textFromFirstLanguage = secondText;
        textFromSecondLanguage = firstText;
        let temp = firstLanguageName;
        firstLanguageName = secondLanguageName;
        secondLanguageName = temp;
      }

      setState({
        id,
        firstText: textFromFirstLanguage,
        secondText: textFromSecondLanguage,
        title,
        firstLanguageName,
        secondLanguageName,
      });
    }
  }, [props]);

  const handleDelete = () => {
    const { deleteTextsAction } = props;
    const { id } = state;
    deleteTextsAction(id);
  };

  if (!props.texts) {
    return <Redirect to={routes.texts} />;
  } else {
    const { id, title, firstText, secondText, firstLanguageName, secondLanguageName } = state;
    const { activeLanguageFirst, activeLanguageSecond } = props;

    return (
      <DetailsTemplate title={title} route={routes.texts} setActionName={setActionName} setIsOpen={setIsOpen}>
        <StyledLanguage>{firstLanguageName}</StyledLanguage>
        <PreformattedText>{firstText}</PreformattedText>
        <StyledLanguage>{secondLanguageName}</StyledLanguage>
        <PreformattedText>{secondText}</PreformattedText>

        {actionName === "edit" && (
          <ModalTemplate open={isOpen} closeModal={() => setIsOpen(false)} title={`Edytuj tekst`}>
            <TextForm
              edit={{ title, firstText, secondText, id }}
              activeLanguageFirst={activeLanguageFirst}
              activeLanguageSecond={activeLanguageSecond}
            />
          </ModalTemplate>
        )}
        {actionName === "delete" && (
          <ModalTemplate open={isOpen} closeModal={() => setIsOpen(false)} title={`Usunąć tekst?`}>
            <>
              <StyledParagraph>Nie będzie możliwości cofnięcia tej akcji</StyledParagraph>
              <StyledButton delete onClick={() => handleDelete()}>
                usuń
              </StyledButton>
            </>
          </ModalTemplate>
        )}
      </DetailsTemplate>
    );
  }
};

const mapStateToProps = (state, ownProps) => {
  return {
    texts: state.texts.find((item) => item._id === ownProps.match.params.id),
    languages: state.languages,
    activeLanguageFirst: state.activeLanguageFirst,
    activeLanguageSecond: state.activeLanguageSecond,
  };
};

const mapDispatchToProps = (dispatch) => ({
  deleteTextsAction: (textsId) => dispatch(deleteTexts(textsId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TextsDetails);
