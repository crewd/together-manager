import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { StoreState } from '../types/store.type';
import { storeReducer } from './modules/store';
import { AuthState } from '../types/auth.type';
import { authReducer } from './modules/auth';
import { NoticeState } from '../types/notice.type';
import { noticeReducer } from './modules/notice';

export interface RootState {
  store: StoreState;
  auth: AuthState;
  notice: NoticeState;
}

const rootReducer = combineReducers<RootState>({
  store: storeReducer,
  auth: authReducer,
  notice: noticeReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunk));
