import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.scss';

const Header = () => (
    <ul className={styles.wrapper}>
        <li className={styles.navItem}><Link className={styles.navItemLink} to="/guess/word">Guess word</Link></li>
        <li className={styles.navItem}><Link className={styles.navItemLink} to="/add/word">Add word</Link></li>
    </ul>
);

export default Header;