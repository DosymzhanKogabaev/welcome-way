// src/redux/store.ts

import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/auth/authSlice';
import { onStorageChange } from './slices/auth/storage';
import postsReducer from './slices/posts/postsSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    posts: postsReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export type AppStore = typeof store;

store.subscribe(() => {
  onStorageChange(store);
});
