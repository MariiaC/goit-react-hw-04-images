import PropTypes from 'prop-types';
import {  useEffect } from 'react';
import { createPortal } from 'react-dom';
import s from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');
export const Modal= ({toggleModal, bigPicture}) =>{

  const onClickOverlay = evt => {
    if (evt.currentTarget === evt.target) {
      toggleModal()
    }
  };

  useEffect(() => {
    const handleKeyDowm = evt => {
      if (evt.code === 'Escape') {
        toggleModal()
      }
    };

    window.addEventListener('keydown', handleKeyDowm);
    return () => {
      window.removeEventListener('keydown', handleKeyDowm);
    }
  }, [toggleModal]);

  const { largeImageURL, tags } = bigPicture;

    return  createPortal(
      <div className={s.overlay} onClick={onClickOverlay}>
        <div className={s.modal}>
          <img src={largeImageURL} alt={tags} />
        </div>
      </div>,
    modalRoot
    )
    }

Modal.propTypes = {
    bigPicture: PropTypes.shape({
    largeImageURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  }),
    toggleModal: PropTypes.func.isRequired,
  };