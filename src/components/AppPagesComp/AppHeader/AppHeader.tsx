import React from 'react';
import { Link } from 'react-router-dom';
import styles from './AppHeader.module.css';
import { useAppSelector } from '../../../redux/hooks';

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'Help Feed', href: '/asking-for-help' },
  { name: 'Integration Roadmap', href: '/roadmap' },
  { name: 'Contact', href: '/contact' },
];

export const AppHeader: React.FC<{
  menuOpen: boolean;
  setMenuOpen: (open: boolean) => void;
}> = ({ menuOpen, setMenuOpen }) => {
  const { user } = useAppSelector(state => state.auth);
  return (
    <header className={styles.header}>
      <div className={styles.headerContainer}>
        <Link to="/asking-for-help" className={styles.logo}>
          WelcomeWay
        </Link>

        <nav className={styles.navDesktop}>
          {navLinks.map(link => (
            <a key={link.name} href={link.href} className={styles.navLink}>
              {link.name}
            </a>
          ))}
          <Link to={`/profile/${user?.id}`} className={styles.avatarButton}>
            {user?.avatar_url ? (
              <img
                src={user.avatar_url}
                alt="Profile avatar"
                className={styles.avatarImage}
              />
            ) : (
              <div className={styles.avatarPlaceholder}>
                {user?.full_name?.[0]?.toUpperCase() || 'U'}
              </div>
            )}
          </Link>
        </nav>

        <button
          className={styles.menuBtn}
          aria-label="Open menu"
          onClick={() => setMenuOpen(true)}
        >
          <span className={styles.menuIcon} />
        </button>
      </div>

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
              href={`/profile/${user?.id}`}
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
