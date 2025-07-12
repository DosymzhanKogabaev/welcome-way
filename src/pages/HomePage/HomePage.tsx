// src/pages/HomePage/HomePage.tsx

import React from 'react';
import styles from './HomePage.module.css';
import '../../index.css';
import { Header } from '../../components/Header/Header';
import { HeroSection } from '../../components/LandingComp/HeroSection/HeroSection';
import { CTA } from '../../components/LandingComp/CTA/CTA';
import { Features } from '../../components/LandingComp/Features1/Features';

export const HomePage: React.FC = () => {
  return (
    <section className={`${styles.homeSection}`}>
      <div className={`${styles.homeContainer} container`}>
        <Header />
        <HeroSection />
        <Features />
        <CTA />
      </div>
    </section>
  );
};
