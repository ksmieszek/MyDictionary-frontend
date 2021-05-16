import React from "react";
import ListGridTemplate from "templates/ListGridTemplate";
import TextsPill from "components/molecules/pills/TextsPill";

const TextsList = ({ activeLanguageFirst, activeLanguageSecond, texts }) => (
  <ListGridTemplate>
    {texts
      .map(({ _id: id, title, firstLanguage, secondLanguage }) => {
        if (
          (activeLanguageFirst.languageId === firstLanguage || activeLanguageFirst.languageId === secondLanguage) &&
          (activeLanguageSecond.languageId === firstLanguage || activeLanguageSecond.languageId === secondLanguage)
        )
          return <TextsPill key={id} id={id} title={title} />;
        else return null;
      })
      .reverse()}
  </ListGridTemplate>
);

export default TextsList;
