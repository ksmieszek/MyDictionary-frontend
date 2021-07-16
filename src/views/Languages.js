import React, { useState } from "react";
import withReduxState from "hoc/withReduxState";
import UserPageTemplate from "templates/UserPageTemplate";
import ModalTemplate from "templates/ModalTemplate";
import LanguageForm from "components/molecules/forms/LanguageForm";
import LanguagesList from "components/molecules/lists/LanguagesList";
import Button from "components/atoms/Button";

const Languages = ({ languages, activeLanguageFirst, activeLanguageSecond, words, texts }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <UserPageTemplate>
      <div>
        <ModalTemplate open={isOpen} closeModal={() => setIsOpen(false)} title="Nowy język">
          <LanguageForm />
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
