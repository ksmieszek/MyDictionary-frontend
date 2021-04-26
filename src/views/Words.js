import React, { useState } from "react";
import withReduxState from "hoc/withReduxState";
import { useHistory } from "react-router-dom";
import UserPageTemplate from "templates/UserPageTemplate";
import SelectLanguages from "components/atoms/SelectLanguages";
import AddWordForm from "components/molecules/forms/AddWordForm";
import WordList from "components/molecules/lists/WordList";
import ModalTemplate from "templates/ModalTemplate";
import Button from "components/atoms/Button";
import Info from "components/atoms/Info";
import routes from "routes/index";

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
              <AddWordForm languages={languages} activeLanguageFirst={activeLanguageFirst} activeLanguageSecond={activeLanguageSecond} />
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
