import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import moment from 'moment';
import { v4 } from 'uuid';
import { Memo, MemoState } from '../../types/memo.type';

const initialState: MemoState = {
  memos: [],
  isLoading: false,
  error: undefined,
};

export const addMemo = createAsyncThunk(
  'memo/add',
  async ({
    content,
    date,
    storeId,
  }: {
    content: string;
    date: Date;
    storeId: string;
  }) => {
    if (!content) {
      throw new Error('not found content');
    }
    if (date.toDateString() !== new Date().toDateString()) {
      throw new Error('mismatch date');
    }
    const newMemo: Memo = {
      content: content,
      memoId: v4(),
      storeId: storeId,
      date: moment().format('YYYY-MM-DD HH:mm'),
      author: '작성자명',
      checked: false,
      completer: '',
    };

    return newMemo;
  },
);

export const updateMemo = createAsyncThunk(
  'memo/update',
  async ({ id, checked }: { id: string; checked: boolean }) => {
    if (!id) {
      throw new Error('not found memo');
    }
    return { id, checked };
  },
);

export const deleteMemo = createAsyncThunk(
  'memo/delete',
  async (id: string) => {
    if (!id) {
      throw new Error('not found memo id');
    }
    return id;
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
      })
      // 인수인계 업데이트
      .addCase(updateMemo.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateMemo.fulfilled, (state, action) => {
        const memoId = action.payload.id;
        const memoIndex = state.memos.findIndex(
          (memo) => memo.memoId === memoId,
        );
        if (memoIndex === -1) {
          return;
        }
        const defaultMemo: Memo = state.memos.filter(
          (memo) => memo.memoId === memoId,
        )[0];
        const updatedMemo: Memo = {
          ...defaultMemo,
          checked: !action.payload.checked,
          completer: action.payload.checked ? '' : '완료자명',
        };
        state.memos.splice(memoIndex, 1, updatedMemo);
        state.isLoading = false;
      })
      .addCase(updateMemo.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      // 인수인계 제거
      .addCase(deleteMemo.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteMemo.fulfilled, (state, action) => {
        const memos = state.memos.filter(
          (memo) => memo.memoId !== action.payload,
        );
        state.memos = memos;
        state.isLoading = false;
      })
      .addCase(deleteMemo.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export default memoSlice.reducer;
