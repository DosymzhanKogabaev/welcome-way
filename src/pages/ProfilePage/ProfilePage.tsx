import React from 'react';
import './ProfilePage.module.css';
import '../../index.css';

export const ProfilePage: React.FC = () => {
  return (
    <section className="profile-page-section">
      <div className="profile-page-container">
        <h1 className="profile-page-title">Profile Page</h1>
        <p className="profile-page-description">
          This is your profile page. Here you can view and edit your profile information.
        </p>
      </div>
    </section>
  );
}
