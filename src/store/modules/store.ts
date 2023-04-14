import { ThunkAction } from 'redux-thunk';
import { Reducer } from 'redux';
import { Store, StoreState } from '../../types/store.type';
import { RootState } from '..';
import { v4 } from 'uuid';

const ADD_STORE_REQUEST = 'ADD_STORE_REQUEST';
const ADD_STORE_SUCCESS = 'ADD_STORE_SUCCESS';
const ADD_STORE_FAILURE = 'ADD_STORE_FAILURE';

const DELETE_STORE_REQUEST = 'DELETE_STORE_REQUEST';
const DELETE_STORE_SUCCESS = 'DELETE_STORE_SUCCESS';
const DELETE_STORE_FAILURE = 'DELETE_STORE_FAILURE';

interface AddStoreRequestAction {
  type: typeof ADD_STORE_REQUEST;
}

interface AddStoreSuccessAction {
  type: typeof ADD_STORE_SUCCESS;
  payload: Store;
}

interface AddStoreFailureAction {
  type: typeof ADD_STORE_FAILURE;
  payload: {
    error: string;
  };
}

interface DeleteStoreRequestAction {
  type: typeof DELETE_STORE_REQUEST;
}

interface DeleteStoreSuccessAction {
  type: typeof DELETE_STORE_SUCCESS;
  payload: {
    storeName: string;
  };
}

interface DeleteStoreFailureAction {
  type: typeof DELETE_STORE_FAILURE;
  payload: {
    error: string;
  };
}

export type StoreActionTypes =
  | AddStoreRequestAction
  | AddStoreSuccessAction
  | AddStoreFailureAction
  | DeleteStoreRequestAction
  | DeleteStoreSuccessAction
  | DeleteStoreFailureAction;

const addStoreRequest = (): StoreActionTypes => ({
  type: ADD_STORE_REQUEST,
});

const addStoreSuccess = (store: Store): StoreActionTypes => ({
  type: ADD_STORE_SUCCESS,
  payload: {
    ...store,
  },
});

const addStoreFailure = (error: string): StoreActionTypes => ({
  type: ADD_STORE_FAILURE,
  payload: {
    error,
  },
});

const deleteStoreRequest = (): StoreActionTypes => ({
  type: DELETE_STORE_REQUEST,
});

const deleteStoreSuccess = (storeName: string): StoreActionTypes => ({
  type: DELETE_STORE_SUCCESS,
  payload: {
    storeName,
  },
});

const deleteStoreFailure = (error: string): StoreActionTypes => ({
  type: DELETE_STORE_FAILURE,
  payload: {
    error,
  },
});

export const addStore = ({
  storeName,
  address,
  startTime,
  endTime,
}: Store): ThunkAction<void, RootState, null, StoreActionTypes> => {
  return (dispatch) => {
    dispatch(addStoreRequest());
    try {
      const newStore: Store = {
        storeName,
        address,
        storeId: v4(),
        startTime,
        endTime,
      };
      dispatch(addStoreSuccess(newStore));
    } catch (error: any) {
      dispatch(addStoreFailure(error.message));
    }
  };
};

export const deleteStore = (
  storeName: string,
): ThunkAction<void, RootState, null, StoreActionTypes> => {
  return (dispatch) => {
    dispatch(deleteStoreRequest());
    try {
      // store를 삭제하는 비즈니스 로직 구현
      dispatch(deleteStoreSuccess(storeName));
    } catch (error: any) {
      dispatch(deleteStoreFailure(error.message));
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
  action: StoreActionTypes,
) => {
  switch (action.type) {
    case ADD_STORE_REQUEST:
    case DELETE_STORE_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case ADD_STORE_SUCCESS:
      return {
        ...state,
        stores: [action.payload, ...state.stores],
        isLoading: false,
        error: null,
      };
    case DELETE_STORE_SUCCESS:
      const storeList = state.stores.filter(
        (store) => store.storeName !== action.payload.storeName,
      );
      return {
        ...state,
        stores: storeList,
        isLoading: false,
        error: null,
      };
    case ADD_STORE_FAILURE:
    case DELETE_STORE_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload.error,
      };
    default:
      return state;
  }
};
