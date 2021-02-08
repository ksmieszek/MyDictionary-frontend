import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.scss';

const Header = () => (
    <header className={styles.wrapper}>
        <nav className={styles.nav}>
            
            <Link className={styles.logo} to="/">YOUr dictionary</Link>
            <ul className={styles.listWrapper}>
                <li className={styles.navItem}><Link className={styles.navItemLink} to="/guess/word">Guess word</Link></li>
                <li className={styles.navItem}><Link className={styles.navItemLink} to="/add/word">Add word</Link></li>
            </ul>
        </nav>
    </header>
    
);

export default Header;