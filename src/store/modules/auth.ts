import { createAsyncThunk, createSlice, createAction } from '@reduxjs/toolkit';
import { LoginData, SignUpData } from '../../types/auth.type';
import { getToken, removeToken, setToken } from '../../util/token-store';

interface AuthState {
  token: string | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  token: getToken(),
  isLoading: false,
  error: null,
};

export const login = createAsyncThunk(
  'auth/login',
  async (loginData: LoginData) => {
    if (!loginData) {
      throw new Error('Login Error');
    }
    const token = 'user_token';
    return token;
  },
);

export const logout = createAction('auth/logout');

export const signUp = createAsyncThunk(
  'auth/signup',
  async (singUpData: SignUpData) => {
    if (!singUpData) {
      throw new Error('SignUp Error');
    }
    return;
  },
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.token = null;
      removeToken();
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.token = action.payload;
        setToken(state.token);
      })
      .addCase(login.rejected, (state) => {
        state.isLoading = false;
        state.error = 'error';
      })
      .addCase(signUp.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(signUp.rejected, (state) => {
        state.isLoading = false;
        state.error = 'error';
      });
  },
});

export default authSlice.reducer;
