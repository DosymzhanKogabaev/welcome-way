// src/pages/HomePage/HomePage.tsx

import React from 'react';
import styles from './HomePage.module.css';
import '../../index.css';
import { Header } from '../../components/Header/Header';
import { Footer } from '../../components/Footer/Footer';

export const HomePage: React.FC = () => {
  return (
    <section className={`${styles.homeSection} section`}>
      <div className={`${styles.homeContainer} container`}>
        <Header />

        <Footer />
      </div>
    </section>
  );
};
