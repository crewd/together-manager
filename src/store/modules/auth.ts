import { ThunkAction } from 'redux-thunk';
import { RootState } from '..';
import { AuthState, LoginData } from '../../types/auth.type';
import { getToken, removeToken, setToken } from '../../util/token-store';

const LOGIN_REQUEST = 'LOGIN_REQUEST';
const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const LOGIN_FAILURE = 'LOGIN_FAILURE';

const LOGOUT = 'LOGOUT';

interface LoginRequestAction {
  type: typeof LOGIN_REQUEST;
}

interface LoginSuccessAction {
  type: typeof LOGIN_SUCCESS;
  payload: {
    token: string;
  };
}

interface LoginFailureAction {
  type: typeof LOGIN_FAILURE;
  error: string;
}

interface LogoutAction {
  type: typeof LOGOUT;
}

export type AuthActionTypes =
  | LoginRequestAction
  | LoginSuccessAction
  | LoginFailureAction
  | LogoutAction;

export const loginRequest = (): AuthActionTypes => ({
  type: LOGIN_REQUEST,
});

export const loginSuccess = (token: string): AuthActionTypes => ({
  type: LOGIN_SUCCESS,
  payload: {
    token,
  },
});

export const loginFailure = (error: string): AuthActionTypes => ({
  type: LOGIN_FAILURE,
  error,
});

export const logout = (): AuthActionTypes => ({
  type: LOGOUT,
});

export const login =
  (loginData: LoginData): ThunkAction<void, RootState, null, AuthActionTypes> =>
  async (dispatch) => {
    try {
      dispatch(loginRequest());
      const token = 'user_token';
      setToken(token);
      setTimeout(() => {
        dispatch(loginSuccess(token));
      }, 500); // 1초 지연
    } catch (error: any) {
      dispatch(loginFailure(error.message));
    }
  };

export const userLogout = (): ThunkAction<
  void,
  RootState,
  null,
  AuthActionTypes
> => {
  return (dispatch) => {
    setTimeout(() => {
      removeToken();
      dispatch({ type: 'LOGOUT' });
    }, 500);
  };
};

const initialState: AuthState = {
  isLoading: false,
  token: getToken(),
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
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
    case LOGOUT:
      return {
        ...state,
        token: null,
      };
    default:
      return state;
  }
};
