import React from "react";
import { connect } from "react-redux";
import ListGridTemplate from "templates/ListGridTemplate";
import TextsPill from "components/molecules/pills/TextsPill";

const TextsList = ({ activeLanguageFirst, activeLanguageSecond, texts }) => (
  <ListGridTemplate>
    {texts
      .map(({ _id: id, title, firstLanguage, secondLanguage }) => {
        if (
          (activeLanguageFirst.name === firstLanguage || activeLanguageFirst.name === secondLanguage) &&
          (activeLanguageSecond.name === firstLanguage || activeLanguageSecond.name === secondLanguage)
        )
          return <TextsPill key={id} id={id} title={title} />;
        else return null;
      })
      .reverse()}
  </ListGridTemplate>
);

const mapDispatchToProps = (dispatch) => ({});

export default connect(null, mapDispatchToProps)(TextsList);
