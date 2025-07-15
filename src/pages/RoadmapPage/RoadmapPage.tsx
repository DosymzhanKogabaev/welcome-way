import React from 'react';
import styles from './RoadmapPage.module.css';
import '../../index.css';
import { AppHeader } from '@/src/components/AppPagesComp/AppHeader/AppHeader';
import { GoPersonFill } from 'react-icons/go';
import { PiHandshakeFill, PiHouseLineFill } from 'react-icons/pi';
import { Link } from 'react-router-dom';

export const RoadMapPage: React.FC = () => {
  const [menuOpen, setMenuOpen] = React.useState(false);

  return (
    <div>
      <AppHeader menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <main className={styles.pageWrapper}>
        <div className={styles.roadmapContainer}>
          <div className={styles.topBlock}>
            <div className={styles.roadmapTitleWrapper}>
              <h2 className={styles.roadmapTitle}>Welcome to WelcomeWay!</h2>
              <p className={styles.roadmapSubtitle}>
                (We're glad to have you with us.)
              </p>
            </div>
            <div className={styles.roadmapIntro}>
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
          </div>

          <div className={styles.bottomBlock}>
            <div className={styles.roles}>
              <div className={styles.roleCard}>
                <div>
                  <h3 className={styles.roleTitle}>Migrants</h3>
                  <GoPersonFill className={styles.icon} />
                  <p>
                    Need help finding housing, a job, or getting local
                    documents? Post a request and someone from the community
                    will reach out.
                  </p>
                </div>
                <Link to="/asking-for-help" className={styles.cardButton}>
                  Ask for Help
                </Link>
              </div>

              <div className={styles.roleCard}>
                <div>
                  {' '}
                  <h3 className={styles.roleTitle}>Volunteers</h3>
                  <PiHandshakeFill className={styles.icon} />
                  <p>
                    Want to offer guidance, translation, or just be a friendly
                    voice? Explore help requests and get involved.
                  </p>
                </div>
                <Link to="/asking-for-help" className={styles.cardButton}>
                  Offer Help
                </Link>
              </div>

              <div className={styles.roleCard}>
                <div>
                  <h3 className={styles.roleTitle}>Local Residents</h3>
                  <PiHouseLineFill className={styles.icon} />
                  <p>
                    Your knowledge of the city and services is gold. Help
                    newcomers settle in and feel welcome.
                  </p>
                </div>
                <Link to="/asking-for-help" className={styles.cardButton}>
                  Help Locally
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
