import PropTypes from 'prop-types';
import { Component } from 'react';
import s from './Searchbar.module.css';

export class Searchbar extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };

  state = {inputValue: ''};
  //methods
  handleSubmit = evt => {
    evt.preventDefault();
    this.props.onSubmit(this.state.inputValue);
    this.setState({ inputValue: '' });
  };

  handleChange = evt => {
    this.setState({ inputValue: evt.target.value });
  };

  render() {
    const { inputValue } = this.state;
    
    return (
      <header className={s.searchbar}>
        <form className={s.search__form} onSubmit={this.handleSubmit}>
          <button type="submit" className={s.search__button}>
            <span className={s.button__label}>Search</span>
          </button>

          <input
            className={s.search__input}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={inputValue}
            onChange={this.handleChange}
          />
        </form>
      </header>
    );
  }
}
