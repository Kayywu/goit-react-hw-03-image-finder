import React from 'react';
import styles from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ imageUrl, alt }) => {
  return (
    <li className={styles.ImageGalleryItem}>
      <img src={imageUrl} alt={alt} className={styles.ImageGalleryItemimage} />
    </li>
  );
};

export default ImageGalleryItem;
