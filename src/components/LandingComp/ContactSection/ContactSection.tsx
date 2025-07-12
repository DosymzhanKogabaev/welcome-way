// src/components/LandingComp/ContactSection/Contact.tsx

import React from 'react';
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import styles from './ContactSection.module.css';

export const ContactSection: React.FC = () => {
  return (
    <section className={styles.section} id="contact-us">
      <div className={styles.container}>
        <p className={styles.description}>
          We are here to help you navigate your new journey.
        </p>
        <h2 className={styles.title}>Get in Touch</h2>
        <p className={styles.subDescription}>
          Have questions or feedback? Reach out to us!
        </p>
        <ul className={styles.contactList}>
          <li className={styles.contactItem}>
            <FaEnvelope className={styles.icon} />
            <h3 className={styles.itemTitle}>Email</h3>
            <p className={styles.itemText}>
              Feel free to drop by our office during working hours.
            </p>
            <a href="mailto:contact@welcomeway.com" className={styles.itemLink}>
              contact@welcomeway.com
            </a>
          </li>
          <li className={styles.contactItem}>
            <FaPhone className={styles.icon} />
            <h3 className={styles.itemTitle}>Phone</h3>
            <p className={styles.itemText}>
              Follow us on social media for updates and community stories.
            </p>
            <a href="tel:+1234567890" className={styles.itemLink}>
              +123-456-7890
            </a>
          </li>
          <li className={styles.contactItem}>
            <FaMapMarkerAlt className={styles.icon} />
            <h3 className={styles.itemTitle}>Office</h3>
            <p className={styles.itemText}>
              Join our newsletter for the latest news and resources.
            </p>
            <p className={styles.itemTextRed}>
              123 Welcome Street, Newcomer City, WC12345
            </p>
          </li>
        </ul>
      </div>
    </section>
  );
};
