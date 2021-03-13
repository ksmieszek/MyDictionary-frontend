import React from "react";

const LanguagesPill = ({ id, name, handleDeleteLanguage }) => {
  return (
    <div>
      <span>{name}</span>
      <button onClick={() => handleDeleteLanguage(id)}>DELETE</button>
    </div>
  );
};

export default LanguagesPill;
