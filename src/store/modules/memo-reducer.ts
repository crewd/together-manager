import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import moment from 'moment';
import { v4 } from 'uuid';
import { Memo } from '../../types/memo.type';

const initialState: {
  memos: Memo[];
  isLoading: boolean;
  error: string | undefined;
} = {
  memos: [],
  isLoading: false,
  error: undefined,
};

export const addMemo = createAsyncThunk(
  'memo/add',
  async ({ content, date }: { content: string; date: Date }) => {
    if (!content) {
      throw new Error('not found content');
    }
    if (date.toDateString() !== new Date().toDateString()) {
      throw new Error('mismatch date');
    }
    const newMemo: Memo = {
      content: content,
      memoId: v4(),
      date: moment().format('YYYY-MM-DD HH:mm'),
      author: '작성자명',
      checked: false,
      completer: '',
    };

    return newMemo;
  },
);

const memoSlice = createSlice({
  name: 'memo',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // 인수인계 추가
      .addCase(addMemo.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addMemo.fulfilled, (state, action) => {
        state.memos = [...state.memos, action.payload];
        state.isLoading = false;
      })
      .addCase(addMemo.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export default memoSlice.reducer;
