import { createAsyncThunk } from '@reduxjs/toolkit';
import moment from 'moment';
import { v4 } from 'uuid';

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

export const addMemo = createAsyncThunk(
  'memo/add',
  async ({ content }: { content: string }) => {
    if (!content) {
      throw new Error('not found content');
    }
    const newMemo = {
      content: content,
      contentId: v4(),
      date: moment().format('YYYY-MM-DD HH:mm'),
      author: '작성자명',
    };

    return newMemo;
  },
);
