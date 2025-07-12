import React from 'react';
import './AskingForHelp.module.css';
import '../../index.css';

export const AskingForHelp: React.FC = () => {
  return (
    <section className="asking-for-help-section">
      <div className="asking-for-help-container">
        <h1 className="asking-for-help-title">Asking for Help</h1>
        <p className="asking-for-help-description">
          If you need assistance, please fill out the form below.
        </p>
      </div>
    </section>
  );
};
