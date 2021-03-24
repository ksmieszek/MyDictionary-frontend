import React from "react";
import Header from "components/organisms/Header";
const UserPageTemplate = ({ children }) => (
  <>
    <Header />
    <>{children}</>
  </>
);

export default UserPageTemplate;
