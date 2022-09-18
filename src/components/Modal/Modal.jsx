import PropTypes from 'prop-types';
import { Component } from 'react';
import s from './Modal.module.css';

export class Modal extends Component {
  static propTypes = {
    largeImageURL: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
  };

  //methods

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDowm);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDowm);
  }

  handleKeyDowm = evt => {
    if (evt.code === 'Escape') {
      this.props.onClose();
    }
  };

  onClickOverlay = evt => {
    if (evt.currentTarget === evt.target) {
      this.props.onClose();
    }
  };

  loadTrigger = () => {
    this.setState({ loading: false });
  };

  //render

  render() {
    const { largeImageURL } = this.props;
    return (
      <div className={s.overlay} onClick={this.onClickOverlay}>
        <div className={s.modal}>
          <img src={largeImageURL} alt="" />
        </div>
      </div>
    );
  }
}
