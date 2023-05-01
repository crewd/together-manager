import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Store, StoreForm, StoreState } from '../../types/store.type';
import { v4 } from 'uuid';

const initialState: StoreState = {
  stores: [],
  isLoading: false,
  error: null,
};

export const addStore = createAsyncThunk(
  'store/add',
  async (storeData: StoreForm) => {
    if (!storeData) {
      throw new Error('create_store_error');
    }
    const newStore: Store = {
      storeId: v4(),
      storeName: storeData.storeName,
      address: storeData.address,
      startTime: storeData.startTime,
      endTime: storeData.endTime,
    };

    return newStore;
  },
);

const storeSlice = createSlice({
  name: 'stroe',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addStore.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addStore.fulfilled, (state, action) => {
        state.isLoading = false;
        state.stores.push(action.payload);
      })
      .addCase(addStore.rejected, (state) => {
        state.isLoading = false;
        state.error = 'error';
      });
  },
});

export default storeSlice.reducer;