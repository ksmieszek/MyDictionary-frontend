import React, { Component } from "react";
// import styles from "./WordsPage.module.scss";
import withReduxState from "../../hoc/withReduxState";
import { connect } from "react-redux";
import { deleteWords } from "../../actions/index";

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
        .map((item) => {
          return `
            <div>
              <span key=${item.userID}>${item.firstLanguage}</span>
              <span key=${item.userID}>${item.firstWord}</span>
              <br />
              <span key=${item.userID}>${item.secondLanguage}</span>
              <span key=${item.userID}>${item.secondWord}</span>
              <br />
              <button type="button" class="deleteButton" data-words-id=${item._id} >DELETE</button> 
            </div>
          `;
        })
        .join("");

      document
        .querySelectorAll(".deleteButton")
        .forEach((item) => item.addEventListener("click", (e) => this.props.deleteWordsAction(e.target.dataset.wordsId)));
    } else {
      document.querySelector(".content").innerHTML = "add words first";
    }
  };

  render() {
    return (
      <>
        <h3>Words page</h3>
        <div className="content" />
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  deleteWordsAction: (wordsId) => dispatch(deleteWords(wordsId)),
});

export default withReduxState(connect(null, mapDispatchToProps)(WordsPage));
