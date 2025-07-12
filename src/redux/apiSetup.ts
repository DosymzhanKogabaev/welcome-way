import ApiClient from '@/src/api/ApiClient';
import { store } from './store';
import { logout, refreshAccessToken } from './slices/auth/authSlice';

export const setupApiClient = () => {
  ApiClient.setTokenHandlers({
    onLogout: () => {
      store.dispatch(logout());
    },
    onRefreshToken: async (token: string) => {
      await store.dispatch(refreshAccessToken(token)).unwrap();
    },
    getAccessToken: () => {
      return store.getState().auth.accessToken;
    },
    getRefreshToken: () => {
      return store.getState().auth.refreshToken;
    },
  });
};
