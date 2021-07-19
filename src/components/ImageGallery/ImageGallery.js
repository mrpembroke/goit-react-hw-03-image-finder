import React from 'react';
import s from './ImageGallery.module.css';

import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';

function ImageGallery({ images, onOpenModal }) {
  return (
    <ul className={s.ImageGallery}>
      {images.map(({ id, webformatURL, largeImageURL, tags }) => (
        <ImageGalleryItem
          key={id}
          webformatURL={webformatURL}
          largeImageURL={largeImageURL}
          tags={tags}
          onOpenModal={onOpenModal}
        />
      ))}
    </ul>
  );
}

export default ImageGallery;
