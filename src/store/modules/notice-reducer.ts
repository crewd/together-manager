import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Notice, NoticeForm, NoticeState } from '../../types/notice.type';
import { v4 } from 'uuid';
import moment from 'moment';

const initialState: NoticeState = {
  notices: [],
  isLoading: false,
  error: undefined,
};

export const addNotice = createAsyncThunk(
  'notice/add',
  async (noticeData: NoticeForm) => {
    if (!noticeData) {
      throw new Error('create_notice_error');
    }
    const newNotice: Notice = {
      noticeId: v4(),
      title: noticeData.title,
      content: noticeData.content,
      createdAt: moment().format('YYYY-MM-DD HH:mm'),
    };

    return newNotice;
  },
);

const noticeSlice = createSlice({
  name: 'notice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addNotice.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addNotice.fulfilled, (state, action) => {
        state.isLoading = false;
        state.notices = [...state.notices, action.payload];
      })
      .addCase(addNotice.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export default noticeSlice.reducer;
