import React from 'react';
import Spinner from 'react-loader-spinner';
import s from './Loader.module.css';

function Loader() {
  return (
    <Spinner
      className={s.Loader}
      type="Circles"
      color="#00BFFF"
      height={100}
      width={100}
      timeout={3000} //3 secs
    />
  );
}

export default Loader;
