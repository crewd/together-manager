import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { WorkDetail, WorkDetailState } from '../../types/work-detail.type';
import { v4 } from 'uuid';

const initialState: WorkDetailState = {
  workDetails: [],
  isLoading: false,
  error: undefined,
};

export const addWorkDetail = createAsyncThunk(
  'workDetail/add',
  async ({
    categoryId,
    title,
    content,
  }: {
    categoryId: string;
    title: string;
    content: string;
  }) => {
    if (!categoryId || !title || !content) {
      throw new Error('not found date');
    }
    const newWorkDetail: WorkDetail = {
      id: v4(),
      categoryId,
      title,
      content,
    };

    return newWorkDetail;
  },
);

const workDetailSlice = createSlice({
  name: 'workDetail',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      // 업무 상세 추가
      .addCase(addWorkDetail.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addWorkDetail.fulfilled, (state, action) => {
        state.workDetails.push(action.payload);
        state.isLoading = false;
      })
      .addCase(addWorkDetail.rejected, (state, action) => {
        state.error = action.error.message;
        state.isLoading = true;
      });
  },
});

export default workDetailSlice.reducer;
