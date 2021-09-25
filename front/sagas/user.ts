import { all, fork, takeLatest, delay, put, call } from "redux-saga/effects";
import axios, { AxiosResponse } from "axios";
import { AnyAction } from "redux";
import {
  LOG_IN_SUCCESS,
  LOG_IN_FAILURE,
  LOG_OUT_FAILURE,
  LOG_OUT_REQUEST,
  LOG_OUT_SUCCESS,
  LOG_IN_REQUEST,
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILURE,
  FOLLOW_REQUEST,
  FOLLOW_SUCCESS,
  FOLLOW_FAILURE,
  UN_FOLLOW_REQUEST,
  UN_FOLLOW_SUCCESS,
  UN_FOLLOW_FAILURE,
  LOAD_MY_INFO_REQUEST,
  LOAD_MY_INFO_SUCCESS,
  LOAD_MY_INFO_FAILURE,
} from "../reducers/user";

function loadMyInfoAPI() {
  return axios.get("/user");
}

function* loadMyInfo(): object {
  try {
    const result = yield call(loadMyInfoAPI);
    yield put({
      type: LOAD_MY_INFO_SUCCESS,
      data: result.data,
    });
  } catch (error) {
    yield put({
      type: LOAD_MY_INFO_FAILURE,
      error: error.response.data,
    });
  }
}

function followAPI(data: any) {
  return axios.post("/api/follow", data);
}

function* follow(action: AnyAction) {
  try {
    // const result = yield call(follow, action.data);
    yield delay(1000);
    yield put({
      type: FOLLOW_SUCCESS,
      data: action.data,
    });
  } catch (error) {
    //put = action 을 dispatch
    yield put({
      type: FOLLOW_FAILURE,
      error: error.response.data,
    });
  }
}

function unfollowAPI(data: any) {
  return axios.post("/api/unfollow", data);
}

function* unfollow(action: AnyAction) {
  try {
    // const result = yield call(unfollowAPI, action.data);
    yield delay(1000);
    yield put({
      type: UN_FOLLOW_SUCCESS,
      data: action.data,
    });
  } catch (error) {
    //put = action 을 dispatch
    yield put({
      type: UN_FOLLOW_FAILURE,
      error: error.response.data,
    });
  }
}

function logInAPI(data: {
  email: string;
  password: string;
}): Promise<AxiosResponse<{ email: string; password: string }>> {
  return axios.post("/user/login", data);
}

function* logIn(action: AnyAction): object {
  try {
    const result = yield call(logInAPI, action.data);
    yield put({
      type: LOG_IN_SUCCESS,
      data: result.data,
    });
  } catch (error) {
    //put = action 을 dispatch
    yield put({
      type: LOG_IN_FAILURE,
      error: error.response.data,
    });
  }
}

function logOutAPI() {
  return axios.post("/user/logout");
}

function* logOut(): Generator<any> {
  try {
    const result = yield call(logOutAPI);
    yield put({
      type: LOG_OUT_SUCCESS,
    });
  } catch (error) {
    //put = action 을 dispatch
    yield put({
      type: LOG_OUT_FAILURE,
      error: error.response.data,
    });
  }
}

function signUpAPI(data: { id: string; password: string }): Promise<AxiosResponse<{ id: string; password: string }>> {
  return axios.post("/user", data);
}

function* signUp(action: AnyAction): Generator<any> {
  try {
    const result = yield call(signUpAPI, action.data);
    yield put({
      type: SIGN_UP_SUCCESS,
    });
  } catch (error) {
    yield put({
      type: SIGN_UP_FAILURE,
      error: error.response.data,
    });
  }
}

// 이벤트 리스너 같은 느낌을 준다.
function* watchLogIn() {
  // LOG_IN 이라는 액션이 실행 될떄까지 기다리겠다.
  yield takeLatest(LOG_IN_REQUEST, logIn);
}

function* watchLogOut() {
  yield takeLatest(LOG_OUT_REQUEST, logOut);
}

function* watchSignUp() {
  yield takeLatest(SIGN_UP_REQUEST, signUp);
}
function* watchFollow() {
  yield takeLatest(FOLLOW_REQUEST, follow);
}

function* watchUnfollow() {
  yield takeLatest(UN_FOLLOW_REQUEST, unfollow);
}

function* watchloadMyInfo() {
  yield takeLatest(LOAD_MY_INFO_REQUEST, loadMyInfo);
}

export default function* userSage() {
  yield all([
    fork(watchFollow),
    fork(watchUnfollow),
    fork(watchloadMyInfo),
    fork(watchLogIn),
    fork(watchLogOut),
    fork(watchSignUp),
  ]);
}
