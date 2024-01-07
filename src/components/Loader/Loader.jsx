import React from 'react';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import styles from './Loader.module.css';

const CustomLoader = () => {
  return (
    <div className={styles.container}>
      <Loader
        type="ThreeDots"
        color="#3f51b5"
        height={100}
        width={100}
        timeout={3000}
      />
    </div>
  );
};

export default CustomLoader;
