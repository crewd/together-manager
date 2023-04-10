import { ThunkAction } from 'redux-thunk';
import { RootState } from '..';
import { AuthState, LoginData, SignUpData } from '../../types/auth.type';
import { getToken, removeToken, setToken } from '../../util/token-store';
import { useNavigate } from 'react-router-dom';

const LOGIN_REQUEST = 'LOGIN_REQUEST';
const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const LOGIN_FAILURE = 'LOGIN_FAILURE';

const LOGOUT = 'LOGOUT';

const SIGNUP_REQUEST = 'SIGNUP_REQUEST';
const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
const SIGNUP_FAILURE = 'SIGNUP_FAILURE';

interface LoginRequestType {
  type: typeof LOGIN_REQUEST;
}

interface LoginSuccessType {
  type: typeof LOGIN_SUCCESS;
  payload: {
    token: string;
  };
}

interface LoginFailureType {
  type: typeof LOGIN_FAILURE;
  error: string;
}

interface LogoutType {
  type: typeof LOGOUT;
}

interface SignUpRequestType {
  type: typeof SIGNUP_REQUEST;
}

interface SignUpSuccessType {
  type: typeof SIGNUP_SUCCESS;
}

interface SignUpFailureType {
  type: typeof SIGNUP_FAILURE;
  error: string;
}

export type AuthActionTypes =
  | LoginRequestType
  | LoginSuccessType
  | LoginFailureType
  | LogoutType
  | SignUpRequestType
  | SignUpSuccessType
  | SignUpFailureType;

const loginRequest = (): AuthActionTypes => ({
  type: LOGIN_REQUEST,
});

const loginSuccess = (token: string): AuthActionTypes => ({
  type: LOGIN_SUCCESS,
  payload: {
    token,
  },
});

const loginFailure = (error: string): AuthActionTypes => ({
  type: LOGIN_FAILURE,
  error,
});

const logout = (): AuthActionTypes => ({
  type: LOGOUT,
});

const signUpRequest = (): AuthActionTypes => ({
  type: SIGNUP_REQUEST,
});

const signUpSuccess = (): AuthActionTypes => ({
  type: SIGNUP_SUCCESS,
});

const signUpFailure = (error: string): AuthActionTypes => ({
  type: SIGNUP_FAILURE,
  error,
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

export const userLogout =
  (): ThunkAction<void, RootState, null, AuthActionTypes> =>
  async (dispatch) => {
    setTimeout(() => {
      dispatch(logout());
      removeToken();
    }, 500);
  };

export const signup =
  (
    signUpData: SignUpData,
  ): ThunkAction<void, RootState, null, AuthActionTypes> =>
  async (dispatch) => {
    const navigate = useNavigate();
    try {
      dispatch(signUpRequest);
      dispatch(signUpSuccess);
      navigate('/login');
    } catch (error: any) {
      dispatch(signUpFailure(error));
    }
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
    case SIGNUP_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case SIGNUP_SUCCESS:
      return {
        ...state,
        isLoading: false,
      };
    case SIGNUP_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
    default:
      return state;
  }
};
