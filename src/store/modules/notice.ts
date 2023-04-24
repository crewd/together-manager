import { ThunkAction } from 'redux-thunk';
import { RootState } from '..';
import { v4 } from 'uuid';
import { Reducer } from 'redux';
import { Notice, NoticeForm, NoticeState } from '../../types/notice.type';
import moment from 'moment';

const ADD_NOTICE_REQUEST = 'ADD_NOTICE_REQUEST';
const ADD_NOTICE_SUCCESS = 'ADD_NOTICE_SUCCESS';
const ADD_NOTICE_FAILURE = 'ADD_NOTICE_FAILURE';

const DELETE_NOTICE_REQUEST = 'DELETE_NOTICE_REQUEST';
const DELETE_NOTICE_SUCCESS = 'DELETE_NOTICE_SUCCESS';
const DELETE_NOTICE_FAILURE = 'DELETE_NOTICE_FAILURE';

interface AddNoticeRequestAction {
  type: typeof ADD_NOTICE_REQUEST;
}

interface AddNoticeSuccessAction {
  type: typeof ADD_NOTICE_SUCCESS;
  payload: Notice;
}

interface AddNoticeFailureAction {
  type: typeof ADD_NOTICE_FAILURE;
  payload: {
    error: string;
  };
}

interface DeleteNoticeRequestAction {
  type: typeof DELETE_NOTICE_REQUEST;
}

interface DeleteNoticeSuccessAction {
  type: typeof DELETE_NOTICE_SUCCESS;
  payload: {
    noticeId: string;
  };
}

interface DeleteNoticeFailureAction {
  type: typeof DELETE_NOTICE_FAILURE;
  payload: {
    error: string;
  };
}

export type NoticeActionTypes =
  | AddNoticeRequestAction
  | AddNoticeSuccessAction
  | AddNoticeFailureAction
  | DeleteNoticeRequestAction
  | DeleteNoticeSuccessAction
  | DeleteNoticeFailureAction;

const addNoticeRequest = (): NoticeActionTypes => ({
  type: ADD_NOTICE_REQUEST,
});

const addNoticeSuccess = (notice: Notice): NoticeActionTypes => ({
  type: ADD_NOTICE_SUCCESS,
  payload: notice,
});

const addNoticeFailure = (error: string): NoticeActionTypes => ({
  type: ADD_NOTICE_FAILURE,
  payload: {
    error,
  },
});

const deleteNoticeRequest = (): NoticeActionTypes => ({
  type: DELETE_NOTICE_REQUEST,
});

const deleteNoticeSuccess = (noticeId: string): NoticeActionTypes => ({
  type: DELETE_NOTICE_SUCCESS,
  payload: {
    noticeId,
  },
});

const deleteNoticeFailure = (error: string): NoticeActionTypes => ({
  type: DELETE_NOTICE_FAILURE,
  payload: {
    error,
  },
});

export const addNotice = (
  notice: NoticeForm,
): ThunkAction<void, RootState, null, NoticeActionTypes> => {
  return (dispatch) => {
    dispatch(addNoticeRequest());
    try {
      const newNotice: Notice = {
        title: notice.title,
        content: notice.content,
        noticeId: v4(),
        createdAt: moment().format('YYYY-MM-DD HH:mm'),
      };
      dispatch(addNoticeSuccess(newNotice));
    } catch (error: any) {
      dispatch(addNoticeFailure(error.message));
    }
  };
};

export const deleteNotice = (
  noticeId: string,
): ThunkAction<void, RootState, null, NoticeActionTypes> => {
  return (dispatch) => {
    dispatch(deleteNoticeRequest());
    try {
      dispatch(deleteNoticeSuccess(noticeId));
    } catch (error: any) {
      dispatch(deleteNoticeFailure(error.message));
    }
  };
};

const initialState: NoticeState = {
  notices: [],
  isLoading: false,
  error: null,
};

export const noticeReducer: Reducer<NoticeState> = (
  state = initialState,
  action: NoticeActionTypes,
) => {
  switch (action.type) {
    case ADD_NOTICE_REQUEST:
    case DELETE_NOTICE_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case ADD_NOTICE_SUCCESS:
      return {
        ...state,
        notices: [action.payload, ...state.notices],
        isLoading: false,
        error: null,
      };
    case DELETE_NOTICE_SUCCESS:
      const notices = state.notices.filter(
        (notice) => notice.noticeId !== action.payload.noticeId,
      );
      return {
        ...state,
        notices: notices,
        isLoading: false,
        error: null,
      };
    case ADD_NOTICE_FAILURE:
    case DELETE_NOTICE_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload.error,
      };
    default:
      return state;
  }
};
