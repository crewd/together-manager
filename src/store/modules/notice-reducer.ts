import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Notice, NoticeFormData, NoticeState } from '../../types/notice.type';
import { v4 } from 'uuid';
import moment from 'moment';

const initialState: NoticeState = {
  notices: [],
  isLoading: false,
  error: undefined,
};

export const addNotice = createAsyncThunk(
  'notice/add',
  async (noticeData: NoticeFormData) => {
    if (!noticeData) {
      throw new Error('create_notice_error');
    }
    const newNotice: Notice = {
      storeId: noticeData.storeId,
      noticeId: v4(),
      title: noticeData.title,
      content: noticeData.content,
      createdAt: moment().format('YYYY-MM-DD HH:mm'),
    };

    return newNotice;
  },
);

export const updateNotice = createAsyncThunk(
  'notice/update',
  async (notice: Notice) => {},
);

export const deleteNotice = createAsyncThunk(
  'notice/delete',
  async (noticeId: string) => {
    if (!noticeId) {
      throw new Error('Not_Found_Notice_Id');
    }
    return noticeId;
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
        state.notices = [...state.notices, action.payload];
        state.isLoading = false;
      })
      .addCase(addNotice.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(deleteNotice.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteNotice.fulfilled, (state, action) => {
        state.notices = state.notices.filter(
          (notice) => notice.noticeId !== action.payload,
        );
        state.isLoading = false;
      })
      .addCase(deleteNotice.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export default noticeSlice.reducer;
