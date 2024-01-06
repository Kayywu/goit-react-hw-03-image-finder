import React from 'react';
import styles from './Modal.module.css';

const Modal = ({ largeImageUrl, alt, onClose }) => {
  return (
    <div className={styles.Overlay} onClick={onClose}>
      <div className={styles.Modal}>
        <img src={largeImageUrl} alt={alt} />
      </div>
    </div>
  );
};

export default Modal;
