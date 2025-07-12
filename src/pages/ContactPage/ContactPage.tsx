import React from 'react';
import styles from './ContactPage.module.css';
import '../../index.css';
import { AppHeader } from '../../components/AppPagesComp/AppHeader/AppHeader';
import { ContactSection } from '../../components/LandingComp/ContactSection/ContactSection';

export const ContactPage: React.FC = () => {
  const [menuOpen, setMenuOpen] = React.useState(false);

  return (
    <div className={styles.page}>
      <AppHeader menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <main className={styles.main}>
        <div className={styles.contentWrapper}>
          <ContactSection />
        </div>
      </main>
    </div>
  );
};
