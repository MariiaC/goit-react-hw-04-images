
import React from "react";
import PropTypes from 'prop-types';
import s from './Button.module.css';

export const Button = ({onButtonClick}) => {
    return (
        <button type="button" onClick={onButtonClick} className={s.button}>Load more</button>
    )
};

Button.protoTypes = {
    onButtonClick: PropTypes.func.isRequired,
};