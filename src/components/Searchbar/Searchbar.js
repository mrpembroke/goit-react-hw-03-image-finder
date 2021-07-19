import React from 'react';
import s from './Searchbar.module.css';

function Searchbar({ onSubmit, onChange, value }) {
  return (
    <header className={s.Searchbar}>
      <form className={s.SearchForm} onSubmit={onSubmit}>
        <button type="submit" className={s.button}>
          <span className={s.label}>Search</span>
        </button>

        <input
          className={s.input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search IMG"
          value={value}
          onChange={onChange}
        />
      </form>
    </header>
  );
}

export default Searchbar;
