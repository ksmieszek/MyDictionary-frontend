import React, { useState } from "react";
import withReduxState from "hoc/withReduxState";
import UserPageTemplate from "templates/UserPageTemplate";
import AddLanguageForm from "components/molecules/forms/AddLanguageForm";
import LanguagesList from "components/molecules/lists/LanguagesList";
import ModalTemplate from "templates/ModalTemplate";
import Button from "components/atoms/Button";

const Languages = ({ languages, activeLanguageFirst, activeLanguageSecond, words, texts }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <UserPageTemplate>
      <div>
        <ModalTemplate open={isOpen} close={() => setIsOpen(false)} title="Nowy język">
          <AddLanguageForm languages={languages} />
        </ModalTemplate>
        <Button add onClick={() => setIsOpen(true)} pulse={languages.length < 2}>
          Dodaj język
        </Button>
        <LanguagesList
          languages={languages}
          activeLanguageFirst={activeLanguageFirst}
          activeLanguageSecond={activeLanguageSecond}
          words={words}
          texts={texts}
        />
      </div>
    </UserPageTemplate>
  );
};

export default withReduxState(Languages);
