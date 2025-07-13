// src/components/LandingComp/Features/Features.tsx

import React from 'react';
import styles from './Features.module.css';
import { CallToActionCard } from './CallToActionCard/CallToActionCard';

export const Features: React.FC = () => {
  return (
    <section className={styles.featuresSection} id="about-us">
      <div className={styles.featuresContainer}>
        <div className={styles.imageWrapper}>
          <img
            src="https://www.intelligenthq.com/wp-content/uploads/2018/02/smarthpone-user.png"
            alt="Features preview"
            className={styles.image}
          />
        </div>
        <div className={styles.textContent}>
          <h2 className={styles.heading}>Integration Made Simple</h2>
          <ul className={styles.featureList}>
            <li>
              <h3>Live Help Feed & Map</h3>
              <p>
                Real-time, multilingual 'messenger' for offers and requests for
                help
              </p>
            </li>
            <li>
              <h3>Personalized Integration Roadmap</h3>
              <p>
                Receive a personalized checklist for step-by-step integration
                guidance
              </p>
            </li>
            <li>
              <h3>AI Companion</h3>
              <p>
                Multilingual chatbot trained on real-world integration issues,
                available 24/7
              </p>
            </li>
          </ul>
        </div>
      </div>

      <CallToActionCard />

      <div
        className={`${styles.featuresContainer} ${styles.reverse}`}
        id="how-it-works"
      >
        <div className={`${styles.textContent} ${styles.textContentSecond}`}>
          <h2 className={styles.heading}>
            More Features for Seamless Integration
          </h2>
          <ul className={styles.featureList}>
            <li>
              <h3>Local Help, Real People</h3>
              <p>
                Get real-time support from people nearby. Whether you need a
                place to stay, help with paperwork, or someone to translate a
                document — just post it. Locals and fellow newcomers are ready
                to respond.
              </p>
            </li>
            <li>
              <h3>Personalized Integration Roadmap</h3>
              <p>
                After a quick onboarding, users receive a personalized
                checklist: 'You’re a refugee from Ukraine in Germany? Here’s
                your step-by-step journey.' No more guessing. Just clear
                guidance.
              </p>
            </li>
            <li>
              <h3>Why it Matters:</h3>
              <p>
                Because integration starts with information and connection. No
                one should feel lost in a new country.
              </p>
            </li>
          </ul>
        </div>
        <div className={styles.imageWrapper}>
          <img
            src="https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQZfAa-BVgclQeAUMZV3K5VCCEsWXzOX0N9qIOQ9FTpB58-hCPb"
            alt="Second features visual"
            className={styles.image}
          />
        </div>
      </div>
    </section>
  );
};
