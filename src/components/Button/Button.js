import React from 'react';
import s from './Button.module.css';

const Button = ({ onLoadMore }) => {
  return (
    <div className={s.buttonContainer}>
      <button type="button" className={s.Button} onClick={onLoadMore}>
        Load more
      </button>
    </div>
  );
};

export default Button;
