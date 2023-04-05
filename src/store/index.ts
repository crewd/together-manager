import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { StoreState } from '../types/store.type';
import { storeReducer } from './modules/store';
import { AuthState } from '../types/auth.type';
import { authReducer } from './modules/auth';

export interface RootState {
  store: StoreState;
  auth: AuthState;
}

const rootReducer = combineReducers<RootState>({
  store: storeReducer,
  auth: authReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunk));
