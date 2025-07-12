// src/pages/NotFoundPage/NotFoundPage.tsx

import React from 'react';
import { Link } from 'react-router-dom';
import styles from './NotFoundPage.module.css';
import '../../index.css';

export const NotFoundPage: React.FC = () => {
  return (
    <section className={`${styles.homeSection} section`}>
      <div className={`${styles.homeContainer} container`}>
        <div className={styles.content}>
          <h1 className={styles.title}>404</h1>
          <p className={styles.subtitle}>Oops! Page Not Found</p>
          <p className={styles.message}>
            It seems you've wandered off the path. Let's get you back on track!
          </p>
          <Link to="/" className={styles.backButton}>
            Back to Home
          </Link>
        </div>
      </div>
    </section>
  );
};
