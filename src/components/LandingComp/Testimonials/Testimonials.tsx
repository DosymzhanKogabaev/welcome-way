// src/components/LandingComp/Testimonials/Testimonials.tsx

import React from 'react';
import styles from './Testimonials.module.css';

import AnnaSmithImg from '@/src/assets/Landing/AnnaSmith.webp';
import MohammedAliImg from '@/src/assets/Landing/MohammedAli.webp';
import ElenaPetrovaImg from '@/src/assets/Landing/ElenaPetrova.webp';
import DavidMullerImg from '@/src/assets/Landing/DavidMuller.webp';

export const Testimonials: React.FC = () => {
  return (
    <section className={styles.section} id="testimonials">
      <div className={styles.container}>
        <h2 className={styles.mainTitle}>Testimonials</h2>
        <p className={styles.subtitle}>
          “WelcomeWay connected me with a local family who helped me find a job
          and settle into my new home. I am forever grateful for this platform.”
          — Amina Okonkwo
        </p>
        <ul className={styles.testimonialList}>
          <li className={styles.testimonialCard}>
            <div className={styles.cardHeader}>
              <img
                src={AnnaSmithImg}
                alt="Anna Smith"
                className={styles.profileImage}
              />
              <div className={styles.personWrapper}>
                <h3 className={styles.name}>Anna Smith</h3>
                <p className={styles.title}>Refugee from Syria</p>
              </div>
            </div>
            <p className={styles.testimonialText}>
              When I arrived, I didn’t know where to start. Through WelcomeWay,
              I found people who spoke my language and understood what I was
              going through. It helped me feel less alone — and more at home.
            </p>
          </li>
          <li className={styles.testimonialCard}>
            <div className={styles.cardHeader}>
              <img
                src={MohammedAliImg}
                alt="Mohammed Ali"
                className={styles.profileImage}
              />
              <div className={styles.personWrapper}>
                <h3 className={styles.name}>Mohammed Ali</h3>
                <p className={styles.title}>Migrant from Iraq</p>
              </div>
            </div>
            <p className={styles.testimonialText}>
              The Live Help Feed was a lifesaver for me. I found someone to
              translate important documents within minutes of posting my
              request.
            </p>
          </li>
          <li className={styles.testimonialCard}>
            <div className={styles.cardHeader}>
              <img
                src={ElenaPetrovaImg}
                alt="Elena Petrova"
                className={styles.profileImage}
              />
              <div className={styles.personWrapper}>
                <h3 className={styles.name}>Elena Petrova</h3>
                <p className={styles.title}>Volunteer Bridge Buddy</p>
              </div>
            </div>
            <p className={styles.testimonialText}>
              Being a Bridge Buddy has been an incredibly rewarding experience.
              I've been able to help newcomers navigate the challenges of
              settling in a new country.
            </p>
          </li>
          <li className={styles.testimonialCard}>
            <div className={styles.cardHeader}>
              <img
                src={DavidMullerImg}
                alt="David Müller"
                className={styles.profileImage}
              />
              <div className={styles.personWrapper}>
                <h3 className={styles.name}>David Müller</h3>
                <p className={styles.title}>Local Resident in Berlin</p>
              </div>
            </div>
            <p className={styles.testimonialText}>
              I love being able to offer my support and knowledge to those who
              are new to my city. WelcomeWay has made it easy for me to connect
              with migrants and refugees in need.
            </p>
          </li>
        </ul>
      </div>
    </section>
  );
};
