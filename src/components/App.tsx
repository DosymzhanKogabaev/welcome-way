// src/components/App.tsx

import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { HomePage } from '../pages/HomePage/HomePage';
import { NotFoundPage } from '../pages/NotFoundPage/NotFoundPage';
import { SignIn } from '../pages/SignIn/SignIn';
import { SignUp } from '../pages/SignUp/SignUp';
import { AskingForHelp } from '../pages/AskingForHelp/AskingForHelp';
import { OfferingHelp } from '../pages/OfferingHelp/OfferingHelp';
import { ProfilePage } from '../pages/ProfilePage/ProfilePage';
import { StartingPage } from '../pages/StartingPage/StartingPage';
import './App.css';

export const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/asking-for-help" element={<AskingForHelp />} />
      <Route path="/offering-help" element={<OfferingHelp />} />
      <Route path="/profile/:id" element={<ProfilePage />} />
      <Route path="/start-here" element={<StartingPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};
