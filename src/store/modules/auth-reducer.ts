import { createAsyncThunk, createSlice, createAction } from '@reduxjs/toolkit';
import { AuthState, LoginData, SignUpData } from '../../types/auth.type';
import { getToken, removeToken, setToken } from '../../util/token-store';

const initialState: AuthState = {
  token: getToken(),
  isLoading: false,
  error: undefined,
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
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(signUp.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(signUp.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export default authSlice.reducer;
