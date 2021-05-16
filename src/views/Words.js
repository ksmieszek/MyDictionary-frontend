import { useState } from "react";
import withReduxState from "hoc/withReduxState";
import { useHistory } from "react-router-dom";
import routes from "routes/index";
import UserPageTemplate from "templates/UserPageTemplate";
import ModalTemplate from "templates/ModalTemplate";
import SelectLanguages from "components/atoms/SelectLanguages";
import WordForm from "components/molecules/forms/WordForm";
import WordList from "components/molecules/lists/WordList";
import Button from "components/atoms/Button";
import Info from "components/atoms/Info";

const Words = ({ activeLanguageFirst, activeLanguageSecond, languages, words }) => {
  const [isOpen, setIsOpen] = useState(false);
  const history = useHistory();

  return (
    <UserPageTemplate>
      <div>
        {languages.length > 1 && Object.keys(activeLanguageFirst).length !== 0 && Object.keys(activeLanguageSecond).length !== 0 ? (
          <>
            <SelectLanguages />
            <ModalTemplate open={isOpen} close={() => setIsOpen(false)} title="Nowe słowo">
              <WordForm />
            </ModalTemplate>
            <Button add onClick={() => setIsOpen(true)} pulse={words.length === 0}>
              Dodaj słowo
            </Button>
            <WordList languages={languages} activeLanguageFirst={activeLanguageFirst} activeLanguageSecond={activeLanguageSecond} words={words} />
          </>
        ) : (
          <Info>
            Żeby dodać słowa, najpierw musisz zdefiniować do jakich języków będą one należeć
            <Button info onClick={() => history.push(routes.languages)}>
              Dodaj języki
            </Button>
          </Info>
        )}
      </div>
    </UserPageTemplate>
  );
};
export default withReduxState(Words);
