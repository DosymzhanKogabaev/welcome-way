import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import { isTokenExpired } from '../../utils/isTokenExpired';
import { logout } from '../../redux/slices/auth/authSlice';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, accessToken } = useAppSelector(state => state.auth);
  const dispatch = useAppDispatch();
  const location = useLocation();

  // Check if user is authenticated and token is valid
  if (!isAuthenticated || !accessToken) {
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }

  // Check if token is expired
  if (isTokenExpired(accessToken)) {
    // Logout user if token is expired
    dispatch(logout());
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};
