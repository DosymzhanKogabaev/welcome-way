import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import ApiClient from '@/src/api/ApiClient';
import { LoginUserRequest, LoginUserResponse } from '@/shared/types/login';
import {
  RegisterUserRequest,
  RegisterUserResponse,
} from '@/shared/types/register';
import { UserInfo } from '@/shared/types/user';
import { DEFAULT_STATE } from './storage';
import { getAuthStateFromLocalStorage } from './storage';

const initialState = getAuthStateFromLocalStorage() || DEFAULT_STATE;

// Async thunk for user registration
export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (userData: RegisterUserRequest) => {
    const response = await ApiClient.post<
      RegisterUserResponse,
      RegisterUserRequest
    >(
      'api/private/auth/register',
      {
        body: userData,
      },
      false,
      false
    );

    if (!response.id) {
      throw new Error('Registration failed');
    }

    return response;
  }
);

// Async thunk for user login
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (credentials: LoginUserRequest) => {
    const response = await ApiClient.post<LoginUserResponse, LoginUserRequest>(
      'api/private/auth/login',
      {
        body: credentials,
      },
      false,
      false
    );

    if (!response.access_token) {
      throw new Error('Login failed');
    }

    return response;
  }
);

export const refreshAccessToken = createAsyncThunk(
  'auth/refreshAccessToken',
  async (refreshToken: string) => {
    const response = await ApiClient.post<
      { access: string },
      { refresh: string }
    >(
      'api/private/auth/refresh',
      {
        body: { refresh: refreshToken },
      },
      false,
      false
    );

    if (!response.access) {
      throw new Error('Refresh token failed');
    }

    return response;
  }
);

// Async thunk for getting user info
export const getUserInfo = createAsyncThunk(
  'auth/getUserInfo',
  async () => {
    const response = await ApiClient.get<UserInfo, any>(
      `api/private/auth/me`,
      {},
      true,
      false
    );

    return response;
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    resetState: state => {
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
      state.accessToken = null;
      state.refreshToken = null;
    },
    logout: state => {
      authSlice.caseReducers.resetState(state);
    },
    clearError: state => {
      state.error = null;
    },
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
  },
  extraReducers: builder => {
    builder
      // Register user cases
      .addCase(registerUser.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        console.log(action.payload);
        state.isAuthenticated = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Registration failed';
      })
      // Login user cases
      .addCase(loginUser.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.accessToken = action.payload.access_token;
        state.refreshToken = action.payload.refresh_token;
        state.isAuthenticated = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Login failed';
      })
      // Get user info cases
      .addCase(getUserInfo.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getUserInfo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(getUserInfo.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to get user info';
      });
  },
});

export const { logout, clearError, setUser, resetState } = authSlice.actions;
export default authSlice.reducer;
