import { ThunkAction } from 'redux-thunk';
import { RootState } from '..';
import { v4 } from 'uuid';
import { Reducer } from 'redux';
import { Notice, NoticeState } from '../../types/notice.type';

const ADD_NOTICE_REQUEST = 'ADD_NOTICE_REQUEST';
const ADD_NOTICE_SUCCESS = 'ADD_NOTICE_SUCCESS';
const ADD_NOTICE_FAILURE = 'ADD_NOTICE_FAILURE';

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

export type NoticeActionTypes =
  | AddNoticeRequestAction
  | AddNoticeSuccessAction
  | AddNoticeFailureAction;

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

export const addNotice = (
  notice: Notice,
): ThunkAction<void, RootState, null, NoticeActionTypes> => {
  return (dispatch) => {
    dispatch(addNoticeRequest());
    try {
      const newNotice: Notice = {
        title: notice.title,
        content: notice.content,
        noticeId: v4(),
      };
      dispatch(addNoticeSuccess(newNotice));
    } catch (error: any) {
      dispatch(addNoticeFailure(error.message));
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

    case ADD_NOTICE_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload.error,
      };
    default:
      return state;
  }
};
