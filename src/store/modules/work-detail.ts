import { createSlice } from '@reduxjs/toolkit';
import { WorkDetailState } from '../../types/work-detail.type';

const initialState: WorkDetailState = {
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
