import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../store/index";
import MainTemplate from "../templates/MainTemplate";
import Header from "../components/organisms/Header";
import GuessWord from "./GuessWord";
import Words from "./Words";
import Languages from "./Languages";

class Root extends Component {
  render() {
    return (
      <Provider store={store}>
        <MainTemplate>
          <BrowserRouter>
            <Header />
            <Switch>
              <Route path="/guess/word" component={GuessWord} />
              <Route path="/show/words" component={Words} />
              <Route path="/languages" component={Languages} />
            </Switch>
          </BrowserRouter>
        </MainTemplate>
      </Provider>
    );
  }
}

export default Root;
