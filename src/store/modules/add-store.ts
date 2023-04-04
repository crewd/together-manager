import { ThunkAction } from 'redux-thunk';
import { Action, Reducer } from 'redux';
import { Store, StoreState } from '../../types/store.type';
import { RootState } from '..';

const ADD_STORE_REQUEST = 'REQUEST_ADD_STORE';
const ADD_STORE_SUCCESS = 'ADD_STORE_SUCCESS';
const ADD_STORE_FAILURE = 'ADD_STORE_FAILURE';

export const addStoreRequest = () => ({
  type: ADD_STORE_REQUEST,
});

export const addStoreSuccess = (store: Store) => ({
  type: ADD_STORE_SUCCESS,
  payload: {
    store,
  },
});

export const addStoreFailure = (error: string) => ({
  type: ADD_STORE_FAILURE,
  payload: {
    error,
  },
});

export type AddStoreAction =
  | ReturnType<typeof addStoreRequest>
  | ReturnType<typeof addStoreSuccess>
  | ReturnType<typeof addStoreFailure>;

export const addStore = (
  storeName: string,
  address: string,
): ThunkAction<void, RootState, null, AddStoreAction> => {
  return (dispatch) => {
    dispatch(addStoreRequest());
    try {
      const newStore = {
        storeName,
        address,
      };
      dispatch(addStoreSuccess(newStore));
    } catch (error: any) {
      dispatch(addStoreFailure(error.message));
    }
  };
};

const initialState: StoreState = {
  stores: [],
  isLoading: false,
  error: null,
};

export const storeReducer: Reducer<StoreState> = (
  state = initialState,
  action,
) => {
  switch (action.type) {
    case ADD_STORE_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case ADD_STORE_SUCCESS:
      return {
        ...state,
        stores: [action.payload.store, ...state.stores],
        isLoading: false,
        error: null,
      };
    case ADD_STORE_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload.error,
      };
    default:
      return state;
  }
};
