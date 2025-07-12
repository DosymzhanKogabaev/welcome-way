// src/components/LandingComp/PricingSection/PricingSection.tsx

import { FC, useState } from 'react';
import styles from './PricingSection.module.css';

const pricingPlans = [
  {
    id: 'basic',
    name: 'Basic',
    description: 'Best for personal use.',
    monthlyPrice: '$19',
    yearlyPrice: '$190',
    features: ['Feature One', 'Feature Two'],
  },
  {
    id: 'standard',
    name: 'Standard',
    description: 'Ideal for small teams.',
    monthlyPrice: '$39',
    yearlyPrice: '$390',
    features: ['Feature One', 'Feature Two', 'Feature Three'],
    popular: true,
  },
  {
    id: 'premium',
    name: 'Premium',
    description: 'For growing businesses.',
    monthlyPrice: '$69',
    yearlyPrice: '$690',
    features: ['Feature One', 'Feature Two', 'Feature Three', 'Feature Four'],
  },
];

export const PricingSection: FC = () => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>(
    'monthly'
  );
  return (
    <section className={styles.pricingSection}>
      <div className={styles.pricingContainer}>
        <h2 className={styles.heading}>Choose the perfect plan for you</h2>
        <p className={styles.subheading}>Pricing plan</p>
        <p className={styles.description}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
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
              <button className={styles.selectBtn}>Select</button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
