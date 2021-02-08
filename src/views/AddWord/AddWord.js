import React from 'react';
import AppContext from '../../context';
import styles from './AddWord.module.scss';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';

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
                    <div className={styles.wrapper}>
                        <form className={styles.form} onSubmit={(e) => context.addWord(e, this.state)}>
                            <div className={styles.keys}>
                                <div className={styles.key}>English</div>
                                <div className={styles.key}>Polish</div>
                            </div>
                            <div className={styles.values}>
                                <div className={styles.value}>
                                    <Input name='english' value={this.state.english} onChange={(e) => this.handleChange(e)} />
                                </div>
                                <div className={styles.value}>
                                    <Input name='polish' value={this.state.polish} onChange={(e) => this.handleChange(e)} />
                                </div>
                            </div>
                            <Button>add</Button>
                        </form>
                    </div>
                )}
            </AppContext.Consumer>
        );
    }
} 

export default AddWord;