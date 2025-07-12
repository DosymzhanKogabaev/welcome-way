import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/src/redux/hooks';
import {
  loginUser,
  clearError,
  getUserInfo,
} from '@/src/redux/slices/auth/authSlice';
import './SignIn.css';
import { hashPassword } from '@/src/utils/auth';

export const SignIn: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { isLoading, error } = useAppSelector(state => state.auth);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [validationErrors, setValidationErrors] = useState<
    Record<string, string>
  >({});
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    dispatch(clearError());

    // Check if we have a success message from signup
    if (location.state?.message) {
      setSuccessMessage(location.state.message);
      // Clear the location state
      navigate('/signin', { replace: true });
    }
  }, [dispatch, location.state, navigate]);

  const validateForm = () => {
    const errors: Record<string, string> = {};

    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email is invalid';
    }

    if (!formData.password) {
      errors.password = 'Password is required';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      const hashedPassword = await hashPassword(
        formData.password,
        formData.email
      );

      // First, login the user
      await dispatch(
        loginUser({
          email: formData.email,
          password: hashedPassword,
        })
      ).unwrap();

      // After successful login, get user info
      await dispatch(getUserInfo()).unwrap();

      // Navigate to home or dashboard
      navigate('/roadmmap');
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    // Clear validation error when user starts typing
    if (validationErrors[name]) {
      setValidationErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <div className="signin-container">
      <div className="signin-card">
        <div className="signin-header">
          <h1>Welcome Back</h1>
          <p>Sign in to your account to continue</p>
        </div>

        {successMessage && (
          <div className="success-banner">
            <span>{successMessage}</span>
            <button
              type="button"
              onClick={() => setSuccessMessage('')}
              className="clear-success-btn"
            >
              ×
            </button>
          </div>
        )}

        <form onSubmit={handleSubmit} className="signin-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className={validationErrors.email ? 'error' : ''}
              placeholder="Enter your email"
              disabled={isLoading}
            />
            {validationErrors.email && (
              <span className="error-message">{validationErrors.email}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              className={validationErrors.password ? 'error' : ''}
              placeholder="Enter your password"
              disabled={isLoading}
            />
            {validationErrors.password && (
              <span className="error-message">{validationErrors.password}</span>
            )}
          </div>

          {error && (
            <div className="error-banner">
              <span>{error}</span>
              <button
                type="button"
                onClick={() => dispatch(clearError())}
                className="clear-error-btn"
              >
                ×
              </button>
            </div>
          )}

          <button type="submit" className="submit-btn" disabled={isLoading}>
            {isLoading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>

        <div className="signin-footer">
          <p>
            Don't have an account?{' '}
            <button
              type="button"
              onClick={() => navigate('/signup')}
              className="link-btn"
            >
              Sign Up
            </button>
          </p>
          <button
            type="button"
            onClick={() => navigate('/')}
            className="link-btn"
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};
