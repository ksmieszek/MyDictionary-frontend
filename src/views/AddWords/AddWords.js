import React from "react";
import { connect } from "react-redux";
import { addWords } from "../../actions/index";
import styles from "./AddWords.module.scss";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";

class AddWords extends React.Component {
  state = {
    english: "",
    polish: "",
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  render() {
    const addWordsAction = this.props.addWordsAction;

    return (
      <div className={styles.wrapper}>
        <form
          className={styles.form}
          onSubmit={(e) => {
            e.preventDefault();
            this.setState({
              english: "",
              polish: "",
            });
            addWordsAction({
              english: this.state.english,
              polish: this.state.polish,
            });
          }}
        >
          <div className={styles.keys}>
            <div className={styles.key}>English</div>
            <div className={styles.key}>Polish</div>
          </div>
          <div className={styles.values}>
            <div className={styles.value}>
              <Input
                name="english"
                value={this.state.english}
                onChange={(e) => this.handleChange(e)}
              />
            </div>
            <div className={styles.value}>
              <Input
                name="polish"
                value={this.state.polish}
                onChange={(e) => this.handleChange(e)}
              />
            </div>
          </div>
          <Button>add</Button>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  addWordsAction: (words) => dispatch(addWords(words)),
});

export default connect(null, mapDispatchToProps)(AddWords);
