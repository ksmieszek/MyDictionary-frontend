import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../store/index";
import MainTemplate from "../templates/MainTemplate";
import Header from "../components/organisms/Header";
import GuessWord from "./GuessWord";
import Words from "./Words";
import Languages from "./Languages";
import Photos from "./Photos";
import PhotoDetails from "./PhotoDetails";

class Root extends Component {
  render() {
    return (
      <Provider store={store}>
        <MainTemplate>
          <BrowserRouter>
            <Header />
            <Switch>
              <Route path="/quiz/words" component={GuessWord} />
              <Route path="/words" component={Words} />
              <Route path="/languages" component={Languages} />
              <Route exact path="/photos" component={Photos} />
              <Route path="/photo/details/:id" component={PhotoDetails} />
            </Switch>
          </BrowserRouter>
        </MainTemplate>
      </Provider>
    );
  }
}

export default Root;
