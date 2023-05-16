import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { CategoryType, CategoryState } from '../../types/category.type';
import { v4 } from 'uuid';

const initialState: CategoryState = {
  categories: [],
  isLoading: false,
  error: undefined,
};

export const addCategory = createAsyncThunk(
  'category/add',
  async ({ storeId, name }: { storeId: string; name: string }) => {
    if (!storeId || !name) {
      throw new Error('not found data');
    }
    const newCategory: CategoryType = {
      id: v4(),
      storeId,
      name,
    };

    return newCategory;
  },
);

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // 카테고리 추가
      .addCase(addCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addCategory.fulfilled, (state, action) => {
        state.categories = [...state.categories, action.payload];
        state.isLoading = true;
      })
      .addCase(addCategory.rejected, (state, action) => {
        state.error = action.error.message;
        state.isLoading = false;
      });
  },
});

export default categorySlice.reducer;
