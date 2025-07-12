import React from 'react';
import './OfferingHelp.module.css';
import '../../index.css';

export const OfferingHelp: React.FC = () => {
  return (
    <section className="offering-help-section">
      <div className="offering-help-container">
        <h1 className="offering-help-title">Offering Help</h1>
        <p className="offering-help-description">
          If you are looking to offer help, please fill out the form below.
        </p>
      </div>
    </section>
  );
};
