import React from "react";

const WordsPill = ({ id, firstLanguage, firstWord, secondLanguage, secondWord, deleteWordsAction }) => {
  return (
    <div>
      <span>{firstLanguage}-</span>
      <span>{firstWord}</span>
      <br />
      <span>{secondLanguage}-</span>
      <span>{secondWord}</span>
      <br />
      <button onClick={() => deleteWordsAction(id)}>DELETE</button>
    </div>
  );
};

export default WordsPill;
