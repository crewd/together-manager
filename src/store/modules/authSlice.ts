import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { LoginData, User } from '../../types/auth.type';
import { setToken } from '../../util/token-store';

interface AuthState {
  token: string | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  token: null,
  isLoading: false,
  error: null,
};

export const login = createAsyncThunk(
  'auth/login',
  async (loginData: LoginData, { rejectWithValue }) => {
    if (!loginData) {
      throw new Error('error');
    }
    const token = 'user_token';
    setToken(token);
    return token;
  },
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.token = action.payload;
      })
      .addCase(login.rejected, (state) => {
        state.isLoading = false;
        state.error = 'error';
      });
  },
});

export default authSlice.reducer;
