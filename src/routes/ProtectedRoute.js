import React from "react";
import { Route, Redirect } from "react-router-dom";
import routes from "routes/index";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const isAuthenticated = localStorage.getItem("userID");
  return isAuthenticated ? <Route {...rest} render={(props) => <Component {...rest} {...props} />} /> : <Redirect to={routes.login} />;
};

export default ProtectedRoute;
