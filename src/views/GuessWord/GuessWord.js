import React from "react";
import withReduxState from "../../hoc/withReduxState";
import { randomNumber } from "../../utilities/Utilities";
import styles from "./GuessWord.module.scss";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";

class GuessWords extends React.Component {
  state = {
    Inputvalue: "",
    isCorrect: false,
    index: randomNumber(0, this.props.words.length),
  };

  handleChange = (e) => {
    this.setState({
      Inputvalue: e.target.value,
    });
  };

  changeNumber = () => {
    this.setState({
      randomNumber: randomNumber(0, this.props.words.length),
    });
  };

  isAnswerCorrect = (e) => {
    e.preventDefault();
    if (this.state.isCorrect === true) {
      this.setState({
        isCorrect: false,
        Inputvalue: "",
      });
      this.changeNumber();
      return;
    }
    const { words } = this.props;
    if (words[this.state.index].secondWord === this.state.Inputvalue) {
      console.log("correct");
      this.setState({
        isCorrect: true,
      });
    }
  };

  render() {
    const { words } = this.props;

    return (
      <div className={styles.wrapper}>
        {words.length !== 0 ? (
          <form className={styles.form} autoComplete="off" onSubmit={(e) => this.isAnswerCorrect(e)}>
            <div className={styles.row}>
              <div className={styles.wordToGuess}>{words[this.state.randomNumber].firstWord}</div>
              <div className={styles.separator}>-</div>
              <Input placeholder="enter word" value={this.state.Inputvalue} onChange={this.handleChange} />
            </div>
            <Button>{this.state.isCorrect ? "next" : "check"}</Button>
          </form>
        ) : (
          <h2>add words first</h2>
        )}
      </div>
    );
  }
}

export default withReduxState(GuessWords);
