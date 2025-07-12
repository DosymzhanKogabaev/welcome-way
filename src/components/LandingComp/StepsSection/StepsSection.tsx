import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './StepsSection.module.css';
// import { FaUserPlus, FaBullhorn, FaGlobe } from 'react-icons/fa6';
// import { FaHandsHelping } from 'react-icons/fa';

export const StepsSection: React.FC = () => {
  const [visibleCards, setVisibleCards] = useState([
    false,
    false,
    false,
    false,
  ]);

  useEffect(() => {
    const timeouts = [0, 200, 400, 600].map((delay, i) =>
      setTimeout(() => {
        setVisibleCards(prev => {
          const next = [...prev];
          next[i] = true;
          return next;
        });
      }, delay)
    );
    return () => timeouts.forEach(clearTimeout);
  }, []);

  // const stepsData = [
  //   {
  //     id: 1,
  //     title: 'Create an Account',
  //     text: 'Sign up on WelcomeWay platform using your email or social media accounts.',
  //     icon: <FaUserPlus />,
  //     className: 'rotate1',
  //   },
  //   {
  //     id: 2,
  //     title: 'Post Your Needs or Offers',
  //     text: 'Share what you need help with or what you can offer to others in the community.',
  //     icon: <FaBullhorn />,
  //     className: 'rotate2',
  //   },
  //   {
  //     id: 3,
  //     title: 'Connect with Locals',
  //     text: 'Engage with locals and other migrants to receive guidance, information, and support.',
  //     icon: <FaHandsHelping />,
  //     className: 'rotate3',
  //   },
  //   {
  //     id: 4,
  //     title: 'Explore Resources',
  //     text: 'Access personalized integration roadmap, community support, and AI companion for further assistance.',
  //     icon: <FaGlobe />,
  //     className: 'rotate4',
  //   },
  // ];

  return (
    <section className={`${styles.section} container`} id="products">
      <div className={styles.container}>
        <div className={styles.intro}>
          <h2 className={styles.title}>Discover the Power of Our Products</h2>
          <p className={styles.description}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            varius enim in eros elementum tristique. Duis cursus, mi quis
            viverra ornare, eros dolor interdum nulla, ut commodo diam libero
            vitae erat.
          </p>
          <Link to="/signup" className={styles.mainAction}>
            Main action
          </Link>
        </div>

        <div className={styles.stepsWrapper}>
          <ul className={styles.cardList}>
            <li
              className={`${styles.card} ${
                visibleCards[0] ? styles.visible : ''
              } ${styles.rotate1}`}
            >
              <h2 className={styles.cardTitle}>Create an Account</h2>
              <p className={styles.cardText}>
                Sign up on WelcomeWay platform using your email or social media
                accounts.
              </p>
            </li>
            <li
              className={`${styles.card} ${
                visibleCards[1] ? styles.visible : ''
              } ${styles.rotate2}`}
            >
              <h2 className={styles.cardTitle}>Post Your Needs or Offers</h2>
              <p className={styles.cardText}>
                Share what you need help with or what you can offer to others in
                the community.
              </p>
            </li>
            <li
              className={`${styles.card} ${
                visibleCards[2] ? styles.visible : ''
              } ${styles.rotate3}`}
            >
              <h2 className={styles.cardTitle}>Connect with Locals</h2>
              <p className={styles.cardText}>
                Engage with locals and other migrants to receive guidance,
                information, and support.
              </p>
            </li>
            <li
              className={`${styles.card} ${
                visibleCards[3] ? styles.visible : ''
              } ${styles.rotate4}`}
            >
              <h2 className={styles.cardTitle}>Explore Resources</h2>
              <p className={styles.cardText}>
                Access personalized integration roadmap, community support, and
                AI companion for further assistance.
              </p>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};
