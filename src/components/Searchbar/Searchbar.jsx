import PropTypes from 'prop-types';
import { useState } from 'react';
import s from './Searchbar.module.css';

export const Searchbar =({onSubmit,clearPage})=> {
  const [picturesName, setPicturesName] = useState('');

 const handleChange = evt => {
    setPicturesName(evt.currentTarget.value.toLowerCase());
  };
  
 const  handleSubmit = evt => {
    evt.preventDefault();

    if (picturesName.trim() === '') {
      return alert('not found')
    }
   onSubmit(picturesName);
   setPicturesName('');
   clearPage();
  };
    return (
      <header className={s.searchbar}>
        <form className={s.search__form} onSubmit={handleSubmit}>
          <button type="submit" className={s.search__button}>
            <span className={s.button__label}>Search</span>
          </button>

          <input
            className={s.search__input}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={handleChange}
          />
        </form>
      </header>
    );
}


Searchbar.propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };