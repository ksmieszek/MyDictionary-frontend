import React, { useState } from "react";
import withReduxState from "hoc/withReduxState";
import { useHistory } from "react-router-dom";
import UserPageTemplate from "templates/UserPageTemplate";
import SelectLanguages from "components/atoms/SelectLanguages";
import AddTextForm from "components/molecules/forms/AddTextForm";
import TextsList from "components/molecules/lists/TextsList";
import ModalTemplate from "templates/ModalTemplate";
import Button from "components/atoms/Button";
import Info from "components/atoms/Info";
import routes from "routes/index";

const Texts = ({ activeLanguageFirst, activeLanguageSecond, languages, texts }) => {
  const [isOpen, setIsOpen] = useState(false);
  const history = useHistory();

  return (
    <UserPageTemplate>
      <div>
        {languages.length > 1 && Object.keys(activeLanguageFirst).length !== 0 && Object.keys(activeLanguageSecond).length !== 0 ? (
          <>
            <SelectLanguages />
            <ModalTemplate open={isOpen} close={() => setIsOpen(false)} title="Nowy tekst">
              <AddTextForm languages={languages} activeLanguageFirst={activeLanguageFirst} activeLanguageSecond={activeLanguageSecond} />
            </ModalTemplate>
            <Button add onClick={() => setIsOpen(true)} pulse={texts.length === 0}>
              Dodaj tekst
            </Button>
            <TextsList languages={languages} activeLanguageFirst={activeLanguageFirst} activeLanguageSecond={activeLanguageSecond} texts={texts} />
          </>
        ) : (
          <Info>
            Żeby dodać teksty, najpierw musisz zdefiniować do jakich języków będą one należeć
            <Button info onClick={() => history.push(routes.languages)}>
              Dodaj języki
            </Button>
          </Info>
        )}
      </div>
    </UserPageTemplate>
  );
};

export default withReduxState(Texts);
