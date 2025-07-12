// src/components/Footer/Footer.tsx

import {
  FaFacebookF,
  FaXTwitter,
  FaLinkedinIn,
  FaYoutube,
} from 'react-icons/fa6';
import style from './Footer.module.css';

export const Footer: React.FC = () => {
  const footerList = [
    {
      name: 'About Us',
      about: ['About', 'Mission', 'Team', 'Volunteer', 'Donate'],
    },
    {
      name: 'Get Involved',
      about: [
        'Contact Us',
        'FAQ',
        'Terms of Use',
        'Privacy Policy',
        'Cookie Policy',
      ],
    },
  ];

  const socialLinks = [
    { name: 'Facebook', icon: <FaFacebookF />, href: '#' },
    { name: 'X', icon: <FaXTwitter />, href: '#' },
    { name: 'LinkedIn', icon: <FaLinkedinIn />, href: '#' },
    { name: 'Youtube', icon: <FaYoutube />, href: '#' },
  ];

  return (
    <footer className={`${style.footer} section`}>
      <div className={`${style.footerContainer} container`}>
        <h2 className={style.title}>WelcomeWay</h2>
        <h3 className={style.subtitle}>
          Subscribe to our newsletter for the latest updates on new features and
          product releases.
        </h3>

        <div className={style.emailSubscription}>
          <input
            className={style.emailInput}
            type="email"
            placeholder="Enter your email"
          />
          <button className={style.submitEmailBtn} type="submit">
            Subscribe to Newsletter
          </button>
        </div>

        <p className={style.license}>© 2025 WelcomeWay. All Rights Reserved.</p>

        <ul className={style.footerList}>
          {footerList.map((section, index) => (
            <li key={index} className={style.footerItem}>
              <h3 className={style.sectionTitle}>{section.name}</h3>
              <ul className={style.linksList}>
                {section.about.map((item, idx) => (
                  <li key={idx} className={style.linkItem}>
                    <a href="#">{item}</a>
                  </li>
                ))}
              </ul>
            </li>
          ))}

          <li className={style.footerItem}>
            <h3 className={style.sectionTitle}>Connect with Us</h3>
            <div className={style.socialWrapper}>
              <ul className={style.socialList}>
                {socialLinks.map((social, idx) => (
                  <li key={idx} className={style.socialItem}>
                    <a href={social.href} aria-label={social.name}>
                      {social.icon}
                      <span className={style.socialName}>{social.name}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </li>
        </ul>

        <p className={style.welcomeTeam}>Designed with ❤️ by WelcomeWay Team</p>

        <ul className={style.policyList}>
          <li className={style.policyItem}>
            <a href="#">/privacy-policy</a>
          </li>
          <li className={style.policyItem}>
            <a href="#">/terms-of-use</a>
          </li>
          <li className={style.policyItem}>
            <a href="#">/cookie-policy</a>
          </li>
        </ul>
      </div>
    </footer>
  );
};
