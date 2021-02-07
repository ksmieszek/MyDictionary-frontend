import React from 'react';
import './index.css';
import GuessWord from "../GuessWord/GuessWord";
import AppContext from '../../context';
import words from '../../assets/initialData/Words';

import { randomNumber } from '../../utilities/Utilities';
//Almost before we knew it, we had left the ground.

class Root extends React.Component {
    state = {
        words: [...words],
        randomNumber: randomNumber(0, words.length),
    }

    changeNumber = () => {
        this.setState({
            randomNumber: randomNumber(0, words.length),
        })
    }

    render() {
        const context = {
            pairOfWords: this.state.words[this.state.randomNumber],
            changeNumber: this.changeNumber,
        }

        return (
            <div className="wrapper">
                <AppContext.Provider value={context}>
                    <GuessWord />
                </AppContext.Provider>
            </div>
        );
    }
}

export default Root;