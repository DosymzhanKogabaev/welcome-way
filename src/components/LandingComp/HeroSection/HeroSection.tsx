// src/components/LandingComp/HeroSection/HeroSection.tsx

import React from 'react';
import { Link } from 'react-router-dom';
import styles from './HeroSection.module.css';

export const HeroSection: React.FC = () => {
  return (
    <section className={styles.hero} id="home">
      <div className={styles.container}>
        <div className={styles.content}>
          <h1 className={styles.title}>
            WelcomeWay - Smart Support & Mutual Aid Network for Migrants and
            Refugees
          </h1>
          <p className={styles.description}>
            Connect with locals and newcomers to offer or receive help instantly
            in your own language
          </p>
          <div className={styles.buttons}>
            <Link to="/signup" className={styles.getStartedButton}>
              Get Started
            </Link>
            <a href="#how-it-works" className={styles.learnMoreButton}>
              Learn More
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
