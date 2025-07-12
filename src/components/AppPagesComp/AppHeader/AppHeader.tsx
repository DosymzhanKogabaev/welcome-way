import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './AppHeader.module.css';

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'Help Feed', href: '/help' },
  { name: 'Integration Roadmap', href: '/roadmap' },
  { name: 'Contact', href: '/contact' },
];

export const AppHeader: React.FC<{
  menuOpen: boolean;
  setMenuOpen: (open: boolean) => void;
}> = ({ menuOpen, setMenuOpen }) => {
  const navigate = useNavigate();

  return (
    <header className={styles.header}>
      <div className={styles.logo}>WelcomeWay</div>
      <nav className={styles.navDesktop}>
        {navLinks.map(link => (
          <a key={link.name} href={link.href} className={styles.navLink}>
            {link.name}
          </a>
        ))}
        <button
          className={styles.profileBtn}
          onClick={() => navigate('/profile/1')}
        >
          Profile
        </button>
      </nav>
      <button
        className={styles.menuBtn}
        aria-label="Open menu"
        onClick={() => setMenuOpen(true)}
      >
        <span className={styles.menuIcon} />
      </button>
      {menuOpen && (
        <div className={styles.mobileMenu}>
          <button
            className={styles.closeMenuBtn}
            aria-label="Close menu"
            onClick={() => setMenuOpen(false)}
          >
            ×
          </button>
          <div className={styles.mobileLogo}>WelcomeWay</div>
          <nav className={styles.navMobile}>
            {navLinks.map(link => (
              <a key={link.name} href={link.href} className={styles.navLink}>
                {link.name}
              </a>
            ))}
            <a
              href="/profile/1" // Mock user ID
              className={styles.navLink}
              onClick={() => setMenuOpen(false)}
            >
              Profile
            </a>
          </nav>
        </div>
      )}
    </header>
  );
};
