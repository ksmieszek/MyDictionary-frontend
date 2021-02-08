import React from 'react';
import AppContext from '../../context';
import styles from './GuessWord.module.scss';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
//{this.state.words.map((item, index) => <h5 key={index}>{item.english}</h5>)}

class GuessWords extends React.Component {
    state = {
        value: '',
        isCorrect: false,
    }

    handleChange = e => {
        this.setState({
            value: e.target.value,
        })
    }

    checkWord = (e, context) => {
        e.preventDefault();

        if (this.state.isCorrect === true) {
            this.setState({
                isCorrect: false,
                value: '',
            });
            context.changeNumber();
            return;
        }

        if (context.pairOfWords.polish === this.state.value) {
            console.log('trafiles');

            this.setState({
                isCorrect: true,
            })
        }
    }

    render() {
        return (
            <AppContext.Consumer>
                {(context) => (
                    <div className={styles.wrapper}>
                        <form className={styles.form} autoComplete="off" onSubmit={(e) => this.checkWord(e, context)}>
                            <div className={styles.row}>
                                <div className={styles.wordToGuess}>{context.pairOfWords.english}</div>
                                <div className={styles.separator}>-</div>
                                <Input  placeholder='enter word' value={this.state.value} onChange={this.handleChange} />
                            </div>
                            <Button>{this.state.isCorrect ? 'next' : 'check'}</Button>
                        </form>
                    </div>
                )}
            </AppContext.Consumer>
            
        );
    }

}

export default GuessWords;