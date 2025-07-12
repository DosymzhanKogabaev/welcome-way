import { AppStore } from '../../store';
import { AuthState } from './types';

export const DEFAULT_STATE = {
  user: null,
  accessToken: null,
  refreshToken: null,
  isLoading: false,
  error: null,
  isAuthenticated: false,
};

export const AUTH_STORAGE_KEY = 'redux_auth';

export const onStorageChange = (state: AppStore) => {
  const authState = state.getState().auth;
  localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(authState));
};

export const getAuthStateFromLocalStorage = (): AuthState | null => {
  const state = localStorage.getItem(AUTH_STORAGE_KEY);
  return state ? JSON.parse(state) : null;
};
