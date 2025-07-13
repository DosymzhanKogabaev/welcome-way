// src/components/LandingComp/PricingSection/PricingSection.tsx

import { FC, useState } from 'react';
import styles from './PricingSection.module.css';
import { Link } from 'react-router-dom';

const pricingPlans = [
  {
    id: 'basic',
    name: 'Basic',
    description: 'Best for personal use.',
    monthlyPrice: 'FREE',
    yearlyPrice: 'FREE',
    features: [
      'Access the Live Help Feed',
      'Personalized Integration Roadmap',
      'Ask questions in your native language',
    ],
  },
  {
    id: 'standard',
    name: 'Standard',
    description: 'Ideal for small teams or volunteer groups.',
    monthlyPrice: '$18',
    yearlyPrice: '$199',
    features: [
      'All Basic Features',
      'Manage multiple requests at once',
      'AI Companion (Beta access)',
      'Verified Helper Profile with Reviews',
    ],
    popular: true,
  },
  {
    id: 'premium',
    name: 'Premium',
    description: 'For growing NGOs, municipalities, or support networks.',
    monthlyPrice: '$49',
    yearlyPrice: '$499',
    features: [
      'All Standard Features',
      'Team Dashboard & Role Management',
      'Analytics & Community Insights',
      'Priority Support & Onboarding',
    ],
  },
];

export const PricingSection: FC = () => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>(
    'monthly'
  );
  return (
    <section className={styles.pricingSection} id="get-involved">
      <div className={styles.pricingContainer}>
        <h2 className={styles.heading}>Choose the perfect plan for you</h2>
        <p className={styles.subheading}>Pricing plan</p>
        <p className={styles.description}>
          Simple, transparent pricing for individuals, teams, and organizations.
        </p>

        <div className={styles.toggleWrapper}>
          <button
            className={`${styles.toggleButton} ${
              billingCycle === 'monthly' ? styles.active : ''
            }`}
            onClick={() => setBillingCycle('monthly')}
          >
            Monthly
          </button>
          <button
            className={`${styles.toggleButton} ${
              billingCycle === 'yearly' ? styles.active : ''
            }`}
            onClick={() => setBillingCycle('yearly')}
          >
            Yearly
          </button>
        </div>

        <div className={styles.cardsWrapper}>
          {pricingPlans.map(plan => (
            <div
              key={plan.id}
              className={`${styles.card} ${plan.popular ? styles.popular : ''}`}
            >
              {plan.popular && <div className={styles.badge}>Most Popular</div>}
              <h3 className={styles.planTitle}>{plan.name}</h3>
              <p className={styles.planDescription}>{plan.description}</p>
              <p className={styles.price}>
                {billingCycle === 'monthly'
                  ? plan.monthlyPrice
                  : plan.yearlyPrice}
              </p>
              <ul className={styles.featureList}>
                {plan.features.map((feature, i) => (
                  <li key={i} className={styles.featureItem}>
                    {feature}
                  </li>
                ))}
              </ul>
              <Link to="/signup">
                <button className={styles.selectBtn}>Select</button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
