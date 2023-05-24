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
      throw new Error('not found data');
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

export const editWorkDetail = createAsyncThunk(
  'workDetail/edit',
  async ({
    id,
    title,
    content,
  }: {
    id: string;
    title: string;
    content: string;
  }) => {
    if (!id || !title || !content) {
      throw new Error('not found date');
    }
    return { id, title, content };
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
      })

      // 업무 상세 수정
      .addCase(editWorkDetail.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editWorkDetail.fulfilled, (state, action) => {
        const workDetailId = action.payload.id;
        const workDetailIndex = state.workDetails.findIndex(
          (workDetail) => workDetail.id === workDetailId,
        );
        if (workDetailIndex === -1) {
          throw new Error('mismatch id');
        }
        const defaultWorkDetail = state.workDetails.filter(
          (workdDetail) => workdDetail.id === workDetailId,
        )[0];

        const editedWorkDetail: WorkDetail = {
          ...defaultWorkDetail,
          title: action.payload.id,
          content: action.payload.content,
        };
        state.workDetails.splice(workDetailIndex, 1, editedWorkDetail);
        state.isLoading = false;
      })
      .addCase(editWorkDetail.rejected, (state, action) => {
        state.error = action.error.message;
        state.isLoading = false;
      });
  },
});

export default workDetailSlice.reducer;
