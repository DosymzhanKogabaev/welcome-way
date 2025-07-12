// src/components/Footer/Footer.tsx

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
    {
      name: 'Connect with Us',
      about: ['Facebook', 'X', 'LinkedIn', 'Youtube'],
    },
  ];

  return (
    <footer className={`${style.footer} container`}>
      <h2 className={style.tytle}>WelcomeWay</h2>
      <h3>
        Subscribe to our newsletter for the latest updates on new features and
        product releases.
      </h3>
      <input
        className={style.emailInput}
        type="email"
        placeholder="Enter your email"
      />
      <button className={style.submitEmailBtn} type="submit">
        Subscribe to Newsletter
      </button>
      <span className={style.license}>
        © 2023 WelcomeWay. All Rights Reserved.
      </span>

      <ul className={style.footerList}>
        {footerList.map((section, index) => (
          <li key={index} className={style.footerItem}>
            <h4 className={style.sectionTitle}>{section.name}</h4>
            <ul className={style.linksList}>
              {section.about.map((item, idx) => (
                <li key={idx} className={style.linkItem}>
                  {item}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </footer>
  );
};
