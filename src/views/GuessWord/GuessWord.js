import React from "react";
import { connect } from "react-redux";
import { randomNumber } from "../../utilities/Utilities";
import styles from "./GuessWord.module.scss";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";

class GuessWords extends React.Component {
  state = {
    Inputvalue: "",
    isCorrect: false,
    randomNumber: randomNumber(0, this.props.words.length),
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

  checkWord = (e) => {
    e.preventDefault();
    if (this.state.isCorrect === true) {
      this.setState({
        isCorrect: false,
        Inputvalue: "",
      });
      this.changeNumber();
      return;
    }
    if (
      this.props.words[this.state.randomNumber].polish === this.state.Inputvalue
    ) {
      console.log("trafiles");
      this.setState({
        isCorrect: true,
      });
    }
  };

  render() {
    const words = this.props.words;
    return (
      <div className={styles.wrapper}>
        <form
          className={styles.form}
          autoComplete="off"
          onSubmit={(e) => this.checkWord(e)}
        >
          <div className={styles.row}>
            <div className={styles.wordToGuess}>
              {words[this.state.randomNumber].english}
            </div>
            <div className={styles.separator}>-</div>
            <Input
              placeholder="enter word"
              value={this.state.Inputvalue}
              onChange={this.handleChange}
            />
          </div>
          <Button>{this.state.isCorrect ? "next" : "check"}</Button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { words } = state;
  return { words };
};

export default connect(mapStateToProps)(GuessWords);
