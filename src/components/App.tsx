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
import { ContactPage } from '../pages/ContactPage/ContactPage';
import { RoadMapPage } from '../pages/RoadmapPage/RoadmapPage';
import { ProtectedRoute } from './ProtectedRoute';
import { PublicRoute } from './PublicRoute';
import './App.css';

export const App: React.FC = () => {
  return (
    <Routes>
      {/* Public routes - accessible to non-authenticated users */}
      <Route path="/" element={<HomePage />} />

      {/* Auth routes - redirect authenticated users away */}
      <Route
        path="/signin"
        element={
          <PublicRoute>
            <SignIn />
          </PublicRoute>
        }
      />
      <Route
        path="/signup"
        element={
          <PublicRoute>
            <SignUp />
          </PublicRoute>
        }
      />

      {/* Protected routes - require authentication */}
      <Route
        path="/asking-for-help"
        element={
          <ProtectedRoute>
            <AskingForHelp />
          </ProtectedRoute>
        }
      />
      <Route
        path="/offering-help"
        element={
          <ProtectedRoute>
            <OfferingHelp />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile/:id"
        element={
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/contact"
        element={
          <ProtectedRoute>
            <ContactPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/roadmap"
        element={
          <ProtectedRoute>
            <RoadMapPage />
          </ProtectedRoute>
        }
      />

      {/* 404 route */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};
