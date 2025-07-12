import React from 'react';
import './StartingPage.module.css';
import '../../index.css';

export const StartingPage: React.FC = () => {
  return (
    <section className="starting-page-section">
      <div className="starting-page-container">
        <h1 className="starting-page-title">Welcome to the Starting Page</h1>
        <p className="starting-page-description">
          This is the starting point of your journey. Here you can find
          resources and links to get started.
        </p>
      </div>
    </section>
  );
};
