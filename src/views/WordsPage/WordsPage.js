import React, { Component } from "react";
import styles from "./WordsPage.module.scss";
import withUserWords from "../../hoc/withUserWords";

class WordsPage extends Component {
  componentDidMount() {
    this.displayContent();
  }

  componentDidUpdate() {
    this.displayContent();
  }

  displayContent = () => {
    if (this.props.words.length > 0) {
      document.querySelector(".content").innerHTML = this.props.words
        .map((item) => `<h6 key=${item.userID}>${item.english}</h6>`)
        .join("");
    } else {
      document.querySelector(".content").innerHTML = "you didnt add words yet";
    }
  };

  render() {
    return (
      <>
        <h1>Words page</h1>
        <div className="content" />
      </>
    );
  }
}

export default withUserWords(WordsPage);
