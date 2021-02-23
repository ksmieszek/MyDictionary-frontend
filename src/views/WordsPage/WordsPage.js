import React, { Component } from "react";
import styles from "./WordsPage.module.scss";
import { connect } from "react-redux";
import { fetchWords } from "../../actions/index";

class WordsPage extends Component {
  async componentDidMount() {
    if (this.props.words.length === 0) {
      const { fetchWordsAction } = this.props;
      await fetchWordsAction();
    }

    if (this.props.words.length > 0) {
      document.querySelector(".content").innerHTML = this.props.words
        .map((item) => `<h6 key=${item.userID}>${item.english}</h6>`)
        .join("");
    } else {
      document.querySelector("h1").innerHTML = "you didnt add words yet";
    }
  }

  render() {
    // const { words } = this.props;

    return (
      <>
        <h1>Words page</h1>
        <div className="content" />
      </>
    );
  }
}

WordsPage.defaultProps = {
  words: [],
};

const mapStateToProps = ({ words }) => {
  return { words };
};

const mapDispatchToProps = (dispatch) => ({
  fetchWordsAction: () => dispatch(fetchWords()),
});

export default connect(mapStateToProps, mapDispatchToProps)(WordsPage);
