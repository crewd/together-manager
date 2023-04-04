import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { storeReducer } from './modules/add-store';
import { StoreState } from '../types/store.type';

export interface RootState {
  store: StoreState;
}

const rootReducer = combineReducers<RootState>({
  store: storeReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
