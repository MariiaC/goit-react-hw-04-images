import React from "react";
import PropTypes from 'prop-types';
import s from './ImageGallery.module.css';
//import {ImageGalleryItem} from '../ImageGalleryItem/ImageGalleryItem'

export const ImageGalleryItem = ({ picture, onClick}) => {
    return (
        <li className={s.galItem}>
        <img
          onClick={() => onClick(picture)}
          src={picture.webformatURL}
          alt={picture.tags} className={s.galItem__image}
           />
</li>
    )
 };

export const ImageGallery = ({ pictures, toggleModal  }) => {
    return (
        <ul className={s.galList}>
        {pictures.map(picture => {
          return (
            <ImageGalleryItem key={picture.id}
              picture={picture}
              onClick={toggleModal} />
          )
                
        })}
        </ul>
    )
};

//props ITEM
 ImageGalleryItem.propTypes = {
   onClick: PropTypes.func.isRequired,
    pictures: PropTypes.arrayOf(
    PropTypes.shape({
      // largeImageURL: PropTypes.string.isRequired,
      webformatURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
    })
  ),
};


ImageGallery.propTypes = {
  pictures: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      // largeImageURL: PropTypes.string.isRequired,
      // webformatURL: PropTypes.string.isRequired,
      // tags: PropTypes.string.isRequired,
    })
  ),
  toggleModal : PropTypes.func.isRequired,
}