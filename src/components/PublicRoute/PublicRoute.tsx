import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAppSelector } from '../../redux/hooks';

interface PublicRouteProps {
  children: React.ReactNode;
}

export const PublicRoute: React.FC<PublicRouteProps> = ({ children }) => {
  const { isAuthenticated } = useAppSelector(state => state.auth);
  const location = useLocation();

  if (isAuthenticated) {
    // Get the location they were trying to go to, or default to roadmap
    const from = location.state?.from?.pathname || '/roadmap';
    return <Navigate to={from} replace />;
  }

  return <>{children}</>;
};
