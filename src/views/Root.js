import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { Provider } from "react-redux";
import store from "store/index";
import routes from "routes/index";
import ProtectedRoute from "routes/ProtectedRoute";
import MainTemplate from "templates/MainTemplate";
import GuessWord from "views/GuessWord";
import Words from "views/Words";
import Languages from "views/Languages";
import Photos from "views/Photos";
import PhotoDetails from "views/PhotoDetails";
import Texts from "views/Texts";
import TextsDetails from "views/TextsDetails";
import LoginPage from "views/LoginPage";
import SignUpPage from "views/SignUpPage";
import ScrollToTop from "utilities/ScrollToTop";

class Root extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <MainTemplate>
          <BrowserRouter>
            <ScrollToTop />
            <Switch>
              <Route exact path={routes.home} render={() => <Redirect to={routes.login} />} />
              <Route path={routes.login} component={LoginPage} />
              <Route path={routes.signup} component={SignUpPage} />
              <ProtectedRoute path={routes.quizWords} component={GuessWord} />
              <ProtectedRoute path={routes.words} component={Words} />
              <ProtectedRoute path={routes.languages} component={Languages} />
              <ProtectedRoute path={routes.photos} component={Photos} />
              <ProtectedRoute path={routes.photo} component={PhotoDetails} />
              <ProtectedRoute path={routes.texts} component={Texts} />
              <ProtectedRoute path={routes.text} component={TextsDetails} />
            </Switch>
          </BrowserRouter>
        </MainTemplate>
      </Provider>
    );
  }
}

export default Root;
