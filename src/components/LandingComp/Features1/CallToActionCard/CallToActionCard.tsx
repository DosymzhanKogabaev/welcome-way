// src/components/LandingComp/Features/CallToActionCard/CallToActionCard.tsx

import React from 'react';
import styles from './CallToActionCard.module.css';
import { Link } from 'react-router-dom';

export const CallToActionCard: React.FC = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.cardStack}>
        <div className={styles.cardLayerBack}></div>
        <div className={styles.cardLayerFront}></div>
        <div className={styles.content}>
          <div className={styles.textBlock}>
            <h2>Join WelcomeWay Today</h2>
            <p>
              Connect with a supportive community of newcomers and locals ready
              to help you navigate your new country.
            </p>
          </div>
          <div className={styles.buttonWrapper}>
            <Link to="signup" className={styles.ctaButton}>
              Sign Up Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
