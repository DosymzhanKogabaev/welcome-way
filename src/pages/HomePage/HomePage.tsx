// src/pages/HomePage/HomePage.tsx

import React from 'react';
import styles from './HomePage.module.css';
import '../../index.css';
import { Header } from '../../components/Header/Header';
import { Footer } from '../../components/Footer/Footer';
import { HeroSection } from '../../components/LandingComp/HeroSection/HeroSection';
import { Features } from '../../components/LandingComp/Features1/Features';
import { PricingSection } from '@/src/components/LandingComp/PricingSection/PricingSection';
import { Testimonials } from '@/src/components/LandingComp/Testimonials/Testimonials';
import { Footer } from '@/src/components/Footer/Footer';
import { ContactSection } from '@/src/components/LandingComp/ContactSection/ContactSection';
import { StepsSection } from '@/src/components/LandingComp/StepsSection/StepsSection';

export const HomePage: React.FC = () => {
  return (
    <section className={`${styles.homeSection}`}>
      <div className={`${styles.homeContainer} container`}>
        <Header />

        <HeroSection />
        <Features />
        <PricingSection />
        <StepsSection />
        <Testimonials />
        <ContactSection />
        <Footer />
      </div>
    </section>
  );
};
