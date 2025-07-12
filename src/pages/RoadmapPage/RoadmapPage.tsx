import React from 'react';
import styles from './RoadmapPage.module.css';
import '../../index.css';
import { AppHeader } from '@/src/components/AppPagesComp/AppHeader/AppHeader';
import { FaUserAlt, FaHandsHelping, FaMapMarkerAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export const RoadMapPage: React.FC = () => {
  const [menuOpen, setMenuOpen] = React.useState(false);
  return (
    <div className="">
      <AppHeader menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <main>
        <section className={styles.roadmapSection}>
          <div className={styles.container}>
            <h2 className={styles.heading}>Welcome to WelcomeWay!</h2>
            <p className={styles.subheading}>We're glad to have you with us.</p>

            <div className={styles.introText}>
              <p>
                Whether you're new to the country or here to help others —
                WelcomeWay is your space to connect, support, and be supported.
              </p>
              <p>
                Our mission is to create a supportive environment where
                newcomers and locals work together to make integration smoother
                and kinder.
              </p>
            </div>

            <div className={styles.roles}>
              <div className={styles.roleCard}>
                <FaUserAlt className={styles.icon} />
                <h3 className={styles.roleTitle}>For Migrants</h3>
                <p>
                  Need help finding housing, a job, or getting local documents?
                  Post a request and someone from the community will reach out.
                </p>
              </div>
              <div className={styles.roleCard}>
                <FaHandsHelping className={styles.icon} />
                <h3 className={styles.roleTitle}>For Volunteers</h3>
                <p>
                  Want to offer guidance, translation, or just be a friendly
                  voice? Explore help requests and get involved.
                </p>
              </div>
              <div className={styles.roleCard}>
                <FaMapMarkerAlt className={styles.icon} />
                <h3 className={styles.roleTitle}>For Local Residents</h3>
                <p>
                  Your knowledge of the city and services is gold. Help
                  newcomers settle in and feel welcome.
                </p>
              </div>
            </div>

            <div className={styles.ctaBox}>
              <p>
                Have questions or need assistance navigating the app?{' '}
                <Link to="/asking-for-help" className={styles.ctaLink}>
                  Visit our Help Page
                </Link>
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};
