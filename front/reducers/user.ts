import produce from "immer";
import { AnyAction } from "redux";
export interface InitialUserProps {
  loadFollowersDone: boolean;
  loadFollowersError: boolean | null;
  loadFollowersLoading: boolean;
  loadFollowingsDone: boolean;
  loadFollowingsError: boolean | null;
  loadFollowingsLoading: boolean;
  loadMyInfoDone: boolean;
  loadMyInfoError: boolean | null;
  loadMyInfoLoading: boolean;
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
  me: any;
  signUpData: {};
  loginData: {};
}

export const initialState: InitialUserProps = {
  loadFollowersDone: false,
  loadFollowersError: null,
  loadFollowersLoading: false,
  loadFollowingsDone: false,
  loadFollowingsError: null,
  loadFollowingsLoading: false,
  loadMyInfoDone: false,
  loadMyInfoError: null,
  loadMyInfoLoading: false,
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

export const LOAD_FOLLOWERS_REQUEST = "LOAD_FOLLOWERS_REQUEST";
export const LOAD_FOLLOWERS_SUCCESS = "LOAD_FOLLOWERS_SUCCESS";
export const LOAD_FOLLOWERS_FAILURE = "LOAD_FOLLOWERS_FAILURE";

export const LOAD_FOLLOWINGS_REQUEST = "LOAD_FOLLOWINGS_REQUEST";
export const LOAD_FOLLOWINGS_SUCCESS = "LOAD_FOLLOWINGS_SUCCESS";
export const LOAD_FOLLOWINGS_FAILURE = "LOAD_FOLLOWINGS_FAILURE";

export const REMOVE_FOLLOWER_REQUEST = "REMOVE_FOLLOWER_REQUEST";
export const REMOVE_FOLLOWER_SUCCESS = "REMOVE_FOLLOWER_SUCCESS";
export const REMOVE_FOLLOWER_FAILURE = "REMOVE_FOLLOWER_FAILURE";

export const ADD_POST_TO_ME = "ADD_POST_TO_ME";
export const REMOVE_POST_OF_ME = "REMOVE_POST_OF_ME";

export const LOAD_MY_INFO_REQUEST = "LOAD_MY_INFO_REQUEST";
export const LOAD_MY_INFO_SUCCESS = "LOAD_MY_INFO_SUCCESS";
export const LOAD_MY_INFO_FAILURE = "LOAD_MY_INFO_FAILURE";

// action creator
export const loginRequestAction = (data: { eamil: string; password: string }) => {
  return {
    type: LOG_IN_REQUEST,
    data,
  };
};

export const loginSuccessAction = (data: { eamil: string; password: string }) => {
  return {
    type: LOG_IN_SUCCESS,
    data,
  };
};

export const loginFailureAction = (data: { eamil: string; password: string }) => {
  return {
    type: LOG_IN_FAILURE,
    data,
  };
};

//함수로 만들어두면 다양한 곳에서 동적으로 값을 바꿀 수 있다.
//객체인 경우 값이 고정되어 버리는 문제가 발생하며 값이 고정되어도 상관없으면 객체를, 값이 동적으로 바뀌어야 하면 함수를 쓴다.
// { type: 'EXAMPLE', value: 'hello' }
// const example = (data) => ({ type: 'EXAMPLE', value: data })

const reducer = (state = initialState, action: AnyAction) => {
  return produce<any>(state, draft => {
    switch (action.type) {
      case REMOVE_FOLLOWER_REQUEST:
        draft.loadFollowersLoading = true;
        draft.loadFollowersError = null;
        draft.loadFollowersDone = false;
        break;
      case REMOVE_FOLLOWER_SUCCESS:
        draft.loadFollowersLoading = false;
        draft.me.Followers = draft.me.Followers.filter((v: { id: string }) => v.id !== action.data.UserId);
        draft.loadFollowersDone = true;
        break;
      case REMOVE_FOLLOWER_FAILURE:
        draft.loadFollowersLoading = false;
        draft.loadFollowersError = action.error;
        break;
      case LOAD_FOLLOWERS_REQUEST:
        draft.loadFollowersLoading = true;
        draft.loadFollowersError = null;
        draft.loadFollowersDone = false;
        break;
      case LOAD_FOLLOWERS_SUCCESS:
        draft.loadFollowersLoading = false;
        draft.me.Followers = action.data;
        draft.loadFollowersDone = true;
        break;
      case LOAD_FOLLOWERS_FAILURE:
        draft.loadFollowersLoading = false;
        draft.loadFollowersError = action.error;
        break;
      case LOAD_FOLLOWINGS_REQUEST:
        draft.loadFollowingsLoading = true;
        draft.loadFollowingsError = null;
        draft.loadFollowingsDone = false;
        break;
      case LOAD_FOLLOWINGS_SUCCESS:
        draft.loadFollowingsLoading = false;
        draft.me.Followings = action.data;
        draft.loadFollowingsDone = true;
        break;
      case LOAD_FOLLOWINGS_FAILURE:
        draft.loadFollowingsLoading = false;
        draft.loadFollowingsError = action.error;
        break;

      case LOAD_MY_INFO_REQUEST:
        draft.loadMyInfoLoading = true;
        draft.loadMyInfoError = null;
        draft.loadMyInfoDone = false;
        break;
      case LOAD_MY_INFO_SUCCESS:
        draft.loadMyInfoLoading = false;
        draft.me = action.data;
        draft.loadMyInfoDone = true;
        break;
      case LOAD_MY_INFO_FAILURE:
        draft.loadMyInfoLoading = false;
        draft.loadMyInfoError = action.error;
        break;
      case UN_FOLLOW_REQUEST:
        draft.unfollowLoading = true;
        draft.unfollowError = null;
        draft.unfollowDone = false;
        break;
      case UN_FOLLOW_SUCCESS:
        draft.unfollowLoading = false;
        draft.unfollowDone = true;
        draft.me.Followings = draft.me.Followings.filter((v: { id: string }) => v.id !== action.data.UserId);
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
        draft.me.Followings.push({ id: action.data.UserId });
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
        draft.me = action.data;
        draft.logInDone = true;
        break;
      case LOG_IN_FAILURE:
        draft.logInLoading = false;
        draft.logInError = action.error;
      case LOG_OUT_REQUEST:
        draft.logOutloading = true;
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
        draft.me.nickname = action.data.nickname;
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
