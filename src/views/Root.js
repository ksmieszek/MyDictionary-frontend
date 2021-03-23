import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import store from "store/index";
import MainTemplate from "templates/MainTemplate";
import Header from "components/organisms/Header";
import GuessWord from "views/GuessWord";
import Words from "views/Words";
import Languages from "views/Languages";
import Photos from "views/Photos";
import PhotoDetails from "views/PhotoDetails";
import Texts from "views/Texts";
import routes from "routes/index";
import TextsDetails from "./TextsDetails";

class Root extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <MainTemplate>
          <BrowserRouter>
            <Header />
            <Switch>
              <Route path={routes.quizWords} component={GuessWord} />
              <Route path={routes.words} component={Words} />
              <Route path={routes.languages} component={Languages} />
              <Route path={routes.photos} component={Photos} />
              <Route path={routes.photo} component={PhotoDetails} />
              <Route path={routes.texts} component={Texts} />
              <Route path={routes.text} component={TextsDetails} />
            </Switch>
          </BrowserRouter>
        </MainTemplate>
      </Provider>
    );
  }
}

export default Root;
