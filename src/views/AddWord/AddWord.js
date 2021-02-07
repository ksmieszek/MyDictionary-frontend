import React from 'react';
import AppContext from '../../context';
import styles from './AddWord.module.scss';

class AddWord extends React.Component{

    state = {
        english: '',
        polish: '',
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        })
    }

    render() {
        return(
            <AppContext.Consumer>
                {(context) => (
                    <form onSubmit={(e) => context.addWord(e, this.state)}>
                        English<input name='english' value={this.state.english} onChange={(e) => this.handleChange(e)}></input>
                        Polish<input name='polish' value={this.state.polish} onChange={(e) => this.handleChange(e)}></input>
                        <button>add</button>
                    </form>
                )}
            </AppContext.Consumer>
        );
    }
} 

export default AddWord;