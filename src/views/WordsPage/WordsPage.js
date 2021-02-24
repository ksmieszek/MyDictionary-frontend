import React, { Component } from "react";
import styles from "./WordsPage.module.scss";
import withUserWords from "../../hoc/withUserWords";
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
    // console.log(this.props);
    //onClick="${this.props.deleteWordsAction}"
    if (this.props.words.length > 0) {
      document.querySelector(".content").innerHTML = this.props.words
        .map((item) => {
          return `
            <div>
              <h6 key=${item.userID}>${item.english}</h6>
              <button type="button" class="deleteButton" data-words-id=${item._id} >DELETE</button> 
            </div>
          `;
        })
        .join("");

      document
        .querySelectorAll(".deleteButton")
        .forEach((item) =>
          item.addEventListener("click", (e) =>
            this.props.deleteWordsAction(e.target.dataset.wordsId)
          )
        );
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

const mapDispatchToProps = (dispatch) => ({
  deleteWordsAction: (wordsId) => dispatch(deleteWords(wordsId)),
});

export default withUserWords(connect(null, mapDispatchToProps)(WordsPage));
