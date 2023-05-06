import { createAsyncThunk } from '@reduxjs/toolkit';

const initialState: {
  memos: {
    content: string;
    date: string;
    author: string;
    checked: boolean;
    completer: string;
  }[];
  isLoading: boolean;
  error: string | undefined;
} = {
  memos: [],
  isLoading: false,
  error: undefined,
};

export const addMemo = createAsyncThunk('memo/add', async () => {});
