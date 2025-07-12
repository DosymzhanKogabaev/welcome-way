// src/components/Header/Header.tsx

import React, { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import styles from './Header.module.css';

export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home', id: '#home' },
    { name: 'About Us', id: '#about-us' },
    { name: 'How it works', id: '#how-it-works' },
    { name: 'Get Involved', id: '#get-involved' },
    { name: 'Contact Us', id: '#contact-us' },
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <a href="#home" className={styles.logo}>
          Logo
        </a>

        <button
          className={styles.menuButton}
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>

        <nav className={styles.nav}>
          <ul className={styles.navList}>
            {navLinks.map(link => (
              <li key={link.id}>
                <a href={link.id} className={styles.navLink}>
                  {link.name}
                </a>
              </li>
            ))}
          </ul>

          <div className={styles.authButtons}>
            <Link to="/signin" className={styles.signInButton}>
              Sign In
            </Link>
            <Link to="/signup" className={styles.signUpButton}>
              Sign Up
            </Link>
          </div>
        </nav>
      </div>

      {isMenuOpen && (
        <nav className={styles.mobileNav}>
          <ul className={styles.mobileNavList}>
            {navLinks.map(link => (
              <li key={link.id} className={styles.mobileNavItem}>
                <a
                  href={link.id}
                  className={styles.mobileNavLink}
                  onClick={toggleMenu}
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
};
