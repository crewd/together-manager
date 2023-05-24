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

export const updateCategory = createAsyncThunk(
  'category/update',
  async ({ id, name }: { id: string; name: string }) => {
    if (!id || !name) {
      throw new Error('not found data');
    }
    return { id, name };
  },
);

export const deleteCategory = createAsyncThunk(
  'category/delete',
  async (id: string) => {
    if (!id) {
      throw new Error('not found category id');
    }
    return id;
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
      })

      //카테고리 수정
      .addCase(updateCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        const categoryId = action.payload.id;
        const categoryIndex = state.categories.findIndex(
          (category) => category.id === categoryId,
        );

        if (categoryIndex === -1) {
          return;
        }
        const defaultCategory: CategoryType = state.categories.filter(
          (category) => category.id === categoryId,
        )[0];
        const updatedCategory: CategoryType = {
          ...defaultCategory,
          name: action.payload.name,
        };
        state.categories.splice(categoryIndex, 1, updatedCategory);
        state.isLoading = false;
      })
      .addCase(updateCategory.rejected, (state, action) => {
        state.error = action.error.message;
        state.isLoading = false;
      })

      // 카테고리 제거
      .addCase(deleteCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        const categories = state.categories.filter(
          (category) => category.id !== action.payload,
        );
        state.categories = categories;
        state.isLoading = false;
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export default categorySlice.reducer;
