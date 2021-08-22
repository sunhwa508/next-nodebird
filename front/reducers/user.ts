import produce from "immer";
import { AnyAction } from "redux";
export interface InitialUserProps {
  followDone: boolean;
  followError: boolean | null;
  followLoading: boolean;
  unfollowDone: boolean;
  unfollowError: boolean | null;
  unfollowLoading: boolean;
  logInDone: boolean;
  logInError: boolean | null;
  logInLoading: boolean;
  logOutDone: boolean;
  logOutError: boolean | null;
  logOutLoading: boolean;
  signUpDone: boolean;
  signUpError: boolean | null;
  signUpLoading: boolean;
  me: null | {
    id: number;
    nickname: string;
    Posts: Array<{ id: number }>;
    Followings: Array<object>;
    Followers: Array<object>;
  };
  signUpData: {};
  loginData: {};
}

export const initialState: InitialUserProps = {
  followDone: false,
  followError: null,
  followLoading: false,
  unfollowDone: false,
  unfollowError: null,
  unfollowLoading: false,
  logInDone: false,
  logInError: null,
  logInLoading: false, //로그인시도중
  logOutDone: false,
  logOutError: null,
  logOutLoading: false, //로그아웃시도중
  signUpDone: false,
  signUpError: null,
  signUpLoading: false, //회원가입 시도
  me: null,
  signUpData: {},
  loginData: {},
};

const dummyUser = (data: { nickname: string; id: number }) => ({
  ...data,
  nickname: "선화",
  id: 1,
  Posts: [{ id: 1 }],
  Followings: [{ nickname: "선화초" }, { nickname: "chanhoLee" }, { nickname: "nenuzeal" }],
  Followers: [{ nickname: "선화초" }, { nickname: "chanhoLee" }, { nickname: "nenuzeal" }],
});

export const LOG_IN_REQUEST = "LOG_IN_REQUEST";
export const LOG_IN_SUCCESS = "LOG_IN_SUCCESS";
export const LOG_IN_FAILURE = "LOG_IN_FAILURE";

export const LOG_OUT_REQUEST = "LOG_OUT_REQUEST";
export const LOG_OUT_SUCCESS = "LOG_OUT_SUCCESS";
export const LOG_OUT_FAILURE = "LOG_OUT_FAILURE";

export const SIGN_UP_REQUEST = "SIGN_UP_REQUEST";
export const SIGN_UP_SUCCESS = "SIGN_UP_SUCCESS";
export const SIGN_UP_FAILURE = "SIGN_UP_FAILURE";

export const CHANGE_NICKNAME_REQUEST = "CHANGE_NICKNAME_REQUEST";
export const CHANGE_NICKNAME_SUCCESS = "CHANGE_NICKNAME_SUCCESS";
export const CHANGE_NICKNAME_FAILURE = "CHANGE_NICKNAME_FAILURE";

export const FOLLOW_REQUEST = "FOLLOW_REQUEST";
export const FOLLOW_SUCCESS = "FOLLOW_SUCCESS";
export const FOLLOW_FAILURE = "FOLLOW_FAILURE";

export const UN_FOLLOW_REQUEST = "UN_FOLLOW_REQUEST";
export const UN_FOLLOW_SUCCESS = "UN_FOLLOW_SUCCESS";
export const UN_FOLLOW_FAILURE = "UN_FOLLOW_FAILURE";

export const ADD_POST_TO_ME = "ADD_POST_TO_ME";
export const REMOVE_POST_OF_ME = "REMOVE_POST_OF_ME";

// action creator
export const loginRequestAction = (data: { id: string; password: string }) => {
  return {
    type: LOG_IN_REQUEST,
    data,
  };
};

export const loginSuccessAction = (data: { id: string; password: string }) => {
  return {
    type: LOG_IN_SUCCESS,
    data,
  };
};

export const loginFailureAction = (data: { id: string; password: string }) => {
  return {
    type: LOG_IN_FAILURE,
    data,
  };
};

//원칙적으로 3단계로 이루어져 있다.
export const logoutRequestAction = () => {
  return {
    type: LOG_OUT_REQUEST,
  };
};

export const logoutSuccessAction = () => {
  return {
    type: LOG_OUT_SUCCESS,
  };
};

export const logoutFailureAction = () => {
  return {
    type: LOG_OUT_FAILURE,
  };
};

export const signUpRequestAction = () => {
  return {
    type: SIGN_UP_REQUEST,
  };
};

export const signUpSuccessAction = () => {
  return {
    type: SIGN_UP_SUCCESS,
  };
};

export const signUpFailureAction = () => {
  return {
    type: SIGN_UP_FAILURE,
  };
};

const reducer = (state = initialState, action: AnyAction) => {
  console.log(action);
  return produce<any>(state, draft => {
    switch (action.type) {
      case UN_FOLLOW_REQUEST:
        draft.unfollowLoading = true;
        draft.unfollowError = null;
        draft.unfollowDone = false;
        break;
      case UN_FOLLOW_SUCCESS:
        draft.unfollowLoading = false;
        draft.unfollowDone = true;
        draft.me.Followings = draft.me.Followings.filter((v: { id: string }) => v.id !== action.data);
        break;
      case UN_FOLLOW_FAILURE:
        draft.unfollowLoading = true;
        draft.unfollowError = action.error;
      case FOLLOW_REQUEST:
        draft.followLoading = true;
        draft.followError = null;
        draft.followDone = false;
        break;
      case FOLLOW_SUCCESS:
        draft.followLoading = false;
        draft.followDone = true;
        draft.me.Followings.push({ id: action.data });
        break;
      case FOLLOW_FAILURE:
        draft.followLoading = true;
        draft.followError = action.error;
      case LOG_IN_REQUEST:
        draft.logInLoading = true;
        draft.logInError = null;
        draft.logInDone = false;
        break;
      case LOG_IN_SUCCESS:
        draft.logInLoading = false;
        draft.logInDone = true;
        draft.me = dummyUser(action.data);
        break;
      case LOG_IN_FAILURE:
        draft.logInLoading = true;
        draft.logInError = action.error;
      case LOG_OUT_REQUEST:
        draft.logOutloading = true;
        draft.logOutDone = false;
        draft.logOutError = null;
        break;
      case LOG_OUT_SUCCESS:
        draft.logOutloading = false;
        draft.logOutDone = true;
        draft.logOutError = false;
        draft.me = null;
        break;
      case LOG_OUT_FAILURE:
        draft.logOutloading = false;
        draft.logOutError = action.error;
        break;
      case SIGN_UP_REQUEST:
        draft.logOutloading = true;
        draft.logOutDone = false;
        draft.logOutError = null;
        break;
      case SIGN_UP_SUCCESS:
        draft.logOutloading = false;
        draft.logOutDone = true;
      case SIGN_UP_FAILURE:
        draft.logOutloading = false;
        draft.logOutError = action.error;
        break;
      case CHANGE_NICKNAME_REQUEST:
        draft.changeNicknameLoading = true;
        draft.changeNicknameError = null;
        draft.changeNicknameDone = false;
        break;
      case CHANGE_NICKNAME_SUCCESS:
        draft.changeNicknameLoading = false;
        draft.changeNicknameDone = true;
        break;
      case CHANGE_NICKNAME_FAILURE:
        draft.changeNicknameLoading = false;
        draft.changeNicknameError = action.error;
        break;
      case ADD_POST_TO_ME:
        draft.me.Posts.unshift({ id: action.data });
        break;
      // return {
      //   ...state,
      //   me: {
      //     ...state.me,
      //     Posts: [{id: action.data},...state.me.Posts],
      //   },
      // };
      case REMOVE_POST_OF_ME:
        draft.me.Posts = draft.ma.Posts.filter((v: any) => v.id !== action.data);
        break;
      // return {
      //   ...state,
      //   me: {
      //     ...state.me,
      //     Posts: state.me?.Posts.filter(v => v.id !== action.data),
      //   },
      // };
      default:
        break;
    }
  });
};

export default reducer;
