import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import auth from './modules/auth';

const store = configureStore({
  reducer: {
    auth: auth,
  },
});
export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;

export default store;
