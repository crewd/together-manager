import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { StoreState } from '../types/store.type';
import { storeReducer } from './modules/store/store';

export interface RootState {
  store: StoreState;
}

const rootReducer = combineReducers<RootState>({
  store: storeReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunk));
