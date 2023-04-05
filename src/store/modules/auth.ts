import { ThunkAction } from 'redux-thunk';
import { RootState } from '..';
import { AuthState, LoginData, User } from '../../types/auth.type';

const LOGIN_REQUEST = 'LOGIN_REQUEST';
const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const LOGIN_FAILURE = 'LOGIN_FAILURE';

interface LoginRequestAction {
  type: typeof LOGIN_REQUEST;
}

interface LoginSuccessAction {
  type: typeof LOGIN_SUCCESS;
  payload: {
    token: string;
    userName: string;
    userEmail: string;
  };
}

interface LoginFailureAction {
  type: typeof LOGIN_FAILURE;
  error: string;
}

export const loginRequest = (): AuthActionTypes => ({
  type: LOGIN_REQUEST,
});

export const loginSuccess = (userData: User): AuthActionTypes => ({
  type: LOGIN_SUCCESS,
  payload: userData,
});

export const loginFailure = (error: string): AuthActionTypes => ({
  type: LOGIN_FAILURE,
  error,
});

export type AuthActionTypes =
  | LoginRequestAction
  | LoginSuccessAction
  | LoginFailureAction;

export const login =
  (loginData: LoginData): ThunkAction<void, RootState, null, AuthActionTypes> =>
  async (dispatch) => {
    try {
      dispatch(loginRequest());
      const user: User = {
        token: 'user_token',
        userEmail: loginData.userEmail,
        userName: '홍길동',
      };
      dispatch(loginSuccess(user));
    } catch (error: any) {
      dispatch(loginFailure(error.message));
    }
  };

const initialState: AuthState = {
  isLoading: false,
  token: null,
  userName: null,
  userEmail: null,
  error: null,
};

export const authReducer = (
  state = initialState,
  action: AuthActionTypes,
): AuthState => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        token: action.payload.token,
        userName: action.payload.userName,
        userEmail: action.payload.userEmail,
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
    default:
      return state;
  }
};
