import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import authReducer from './modules/auth-reducer';
import storeReducer from './modules/store-reducer';
import noticeReducer from './modules/notice-reducer';
import memoReducer from './modules/memo-reducer';

const store = configureStore({
  reducer: {
    authReducer: authReducer,
    storeReducer: storeReducer,
    noticeReducer: noticeReducer,
    memoReducer: memoReducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;

export default store;
