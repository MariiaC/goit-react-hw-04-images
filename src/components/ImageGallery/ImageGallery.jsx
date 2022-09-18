import React from "react";
import PropTypes from 'prop-types';
import s from './ImageGallery.module.css';
//import {ImageGalleryItem} from '../ImageGalleryItem/ImageGalleryItem'

export const ImageGalleryItem = ({ smallImageURL, tags, largeImageURL, onImageClick }) => {
    return (
        <li className={s.galItem}>
  <img src={smallImageURL} alt={tags} className={s.galItem__image} onClick={() => onImageClick(largeImageURL)} />
</li>
    )
 };

export const ImageGallery = ({ images, onImageClick }) => {
    return (
        <ul className={s.galList}>
            {images.map(({ id, largeImageURL, webformatURL, tags }) => (
                <ImageGalleryItem key={id} smallImageURL={webformatURL} tags={tags} largeImageURL={largeImageURL} onImageClick={onImageClick} />
            ))}
        </ul>
    )
};

//props
 ImageGalleryItem.propTypes = {
  smallImageURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  onImageClick: PropTypes.func.isRequired,
};


ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      largeImageURL: PropTypes.string.isRequired,
      webformatURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
    })
  ),
  onImageClick: PropTypes.func.isRequired,
}