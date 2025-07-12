// src/components/LandingComp/Features/Features.tsx

import React from 'react';
import styles from './Features.module.css';
import { CallToActionCard } from './CallToActionCard/CallToActionCard';

export const Features: React.FC = () => {
  return (
    <section className={styles.featuresSection}>
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

      <div className={`${styles.featuresContainer} ${styles.reverse}`}>
        <div className={styles.textContent}>
          <h2 className={styles.heading}>
            More Features for Seamless Integration
          </h2>
          <ul className={styles.featureList}>
            <li>
              <h3>Feature #1</h3>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse varius enim in eros elementum tristique. Duis
                cursus, mi quis viverra ornare, eros dolor interdum nulla, ut
                commodo diam libero vitae erat.
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
              <h3>Feature #3</h3>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse varius enim in eros elementum tristique. Duis
                cursus, mi quis viverra ornare, eros dolor interdum nulla, ut
                commodo diam libero vitae erat.
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
