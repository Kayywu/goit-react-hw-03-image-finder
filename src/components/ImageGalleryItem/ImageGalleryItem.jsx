import React from 'react';
import styles from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ imageUrl, alt, onClick }) => {
  return (
    <li className={styles.ImageGalleryItem}>
      <img 
      src={imageUrl} 
      alt={alt} 
      className={styles.ImageGalleryItemimage}
      onClick={onClick} />
    </li>
  );
};

export default ImageGalleryItem;
