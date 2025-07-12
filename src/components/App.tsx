// src/components/App.tsx

import { Route, Routes } from 'react-router-dom';
import { HomePage } from '../pages/HomePage/HomePage';
import { NotFoundPage } from '../pages/NotFoundPage/NotFoundPage';
import { SignIn } from '../pages/SignIn/SignIn';
import { SignUp } from '../pages/SignUp/SignUp';
import './App.css';

export const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};
