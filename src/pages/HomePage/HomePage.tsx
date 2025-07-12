// src/pages/HomePage/HomePage.tsx

import React from 'react';
import styles from './HomePage.module.css';
import '../../index.css';
import { Header } from '../../components/Header/Header';
import { Footer } from '../../components/Footer/Footer';
import { HeroSection } from '../../components/LandingComp/HeroSection/HeroSection';
import { CTA } from '../../components/LandingComp/CTA/CTA';
import { Features1 } from '../../components/LandingComp/Features1/Features1';
import { Features2 } from '../../components/LandingComp/Features2/Features2';

export const HomePage: React.FC = () => {
  return (
    <section className={`${styles.homeSection}`}>
      <div className={`${styles.homeContainer} container`}>
        <Header />

        <HeroSection />
        <Features1 />
        <Features2 />
        <CTA />

        <Footer />
      </div>
    </section>
  );
};
