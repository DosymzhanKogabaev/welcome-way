import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
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
      <Link to="/asking-for-help" className={styles.logo}>
        WelcomeWay
      </Link>
      <nav className={styles.navDesktop}>
        {navLinks.map(link => (
          <a key={link.name} href={link.href} className={styles.navLink}>
            {link.name}
          </a>
        ))}
        <button
          className={styles.profileBtn}
          onClick={() => navigate('/profile/1')} // Mock user ID
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
          <Link to="/asking-for-help" className={styles.mobileLogo}>
            WelcomeWay
          </Link>
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
