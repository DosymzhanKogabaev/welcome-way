// src/pages/NotFoundPage/NotFoundPage.tsx

import React from 'react';
import styles from './NotFoundPage.module.css';
import '../../index.css';

export const NotFoundPage: React.FC = () => {
  return (
    <section className={`${styles.homeSection} section`}>
      <div className={`${styles.homeContainer} container`}></div>
    </section>
  );
};
