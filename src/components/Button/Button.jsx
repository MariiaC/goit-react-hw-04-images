
import React from "react";
import PropTypes from 'prop-types';
import s from './Button.module.css';

export const Button = ({changePage }) => {
    return (
        <button type="button" onClick={changePage } className={s.button}>Load more</button>
    )
};

Button.protoTypes = {
    changePage : PropTypes.func.isRequired,
};