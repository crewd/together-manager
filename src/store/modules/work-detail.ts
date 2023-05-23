import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  workDetails: [],
  isLoading: false,
  error: undefined,
};

const workDetailSlice = createSlice({
  name: 'workDetail',
  initialState,
  reducers: {},
});

export default workDetailSlice.reducer;
