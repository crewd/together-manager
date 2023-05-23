import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import authReducer from './modules/auth-reducer';
import storeReducer from './modules/store-reducer';
import noticeReducer from './modules/notice-reducer';
import memoReducer from './modules/memo-reducer';
import categoryReducer from './modules/category-reducer';
import workDetailReducer from './modules/workDetail-reducer';

const store = configureStore({
  reducer: {
    authReducer: authReducer,
    storeReducer: storeReducer,
    noticeReducer: noticeReducer,
    memoReducer: memoReducer,
    categoryReducer: categoryReducer,
    workDetailReducer: workDetailReducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;

export default store;
