import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../../store/index";
import "./index.css";
import GuessWord from "../GuessWord/GuessWord";
import AddWords from "../AddWords/AddWords";
import Header from "../../components/Header/Header";

//Almost before we knew it, we had left the ground.

class Root extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <div className="wrapper">
          <BrowserRouter>
            <Header />
            <Switch>
              <Route path="/guess/word" component={GuessWord} />
              <Route path="/add/words" component={AddWords} />
            </Switch>
          </BrowserRouter>
        </div>
      </Provider>
    );
  }
}

export default Root;
