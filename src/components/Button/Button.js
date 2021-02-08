import React from 'react';
//import styles from './Button.module.scss';

const Button = ({children ,...props}) => (
    <>
        <button {...props}>{children}</button>
    </>
);

export default Button;