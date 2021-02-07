import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => (
    <ul>
        <Link to="/guess/word">Guess word</Link>
        <Link to="/add/word">Add word</Link>
    </ul>
);

export default Header;