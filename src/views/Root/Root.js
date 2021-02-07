import React from 'react';
import AppContext from '../../context';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './index.css';
import words from '../../assets/initialData/Words';
import { randomNumber } from '../../utilities/Utilities';
import GuessWord from "../GuessWord/GuessWord";
import AddWord from "../AddWord/AddWord";
import Header from "../../components/Header/Header";

//Almost before we knew it, we had left the ground.

class Root extends React.Component {
    state = {
        words: [...words],
        randomNumber: randomNumber(0, words.length),
    }

    changeNumber = () => {
        this.setState({
            randomNumber: randomNumber(0, this.state.words.length),
        })
    }

    addWord = (e, externalState) => {
        e.preventDefault();

        this.setState((prevState) => ({
            words: [...prevState.words, { english: externalState.english, polish: externalState.polish}]
        }))
    }

    render() {

        const guessWordContext = {
            pairOfWords: this.state.words[this.state.randomNumber],
            changeNumber: this.changeNumber,
        }
        const addWordContext = {
            addWord: this.addWord,
        }

        return (
            <div className="wrapper">
                <BrowserRouter>
                    <Header />

                    <AppContext.Provider value={guessWordContext}>
                        <Switch>
                            <Route path="/guess/word" component={GuessWord} />
                        </Switch>
                    </AppContext.Provider>

                    <AppContext.Provider value={addWordContext}>
                        <Switch>
                            <Route path="/add/word" component={AddWord} />
                        </Switch>
                    </AppContext.Provider>

                </BrowserRouter>
            </div>
        );
    }
}

export default Root;