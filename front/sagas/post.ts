import axios, { AxiosRequestConfig } from "axios";
import { all, delay, put, fork, takeLatest, throttle, call } from "redux-saga/effects";
import { AnyAction } from "redux";
import {
  ADD_POST_FAILURE,
  ADD_POST_REQUEST,
  ADD_POST_SUCCESS,
  LOAD_POSTS_FAILURE,
  LOAD_POSTS_REQUEST,
  LOAD_POSTS_SUCCESS,
  ADD_COMMENT_REQUEST,
  ADD_COMMENT_SUCCESS,
  ADD_COMMENT_FAILURE,
  REMOVE_POST_FAILURE,
  REMOVE_POST_REQUEST,
  REMOVE_POST_SUCCESS,
} from "../reducers/post";
import { ADD_POST_TO_ME, REMOVE_POST_OF_ME } from "../reducers/user";
import shortId from "shortid";
import { rootType } from "../reducers";

function loadPostsAPI(data: AxiosRequestConfig | undefined) {
  return axios.get("/posts", data);
}

function* loadPosts(action: AnyAction): object {
  try {
    const result = yield call(loadPostsAPI, action.data);
    yield put({
      type: LOAD_POSTS_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOAD_POSTS_FAILURE,
      data: err.response.data,
    });
  }
}

function addPostAPI(data: AxiosRequestConfig | undefined) {
  return axios.post("/post", { content: data }, { withCredentials: true });
}

function* addPost(action: AnyAction): object {
  try {
    const result = yield call(addPostAPI, action.data);
    const id = shortId.generate();
    yield put({
      type: ADD_POST_SUCCESS,
      data: result.data,
    });
    yield put({
      type: ADD_POST_TO_ME,
      data: result.data.id,
    });
  } catch (err) {
    //put = action 을 dispatch
    yield put({
      type: ADD_POST_FAILURE,
      data: err.response.data,
    });
  }
}

function addCommentAPI(data: { postId: string }) {
  return axios.post(`/post/${data.postId}/comment`, data);
}

function* addComment(action: AnyAction): object {
  try {
    const result = yield call(addCommentAPI, action.data);
    yield put({
      type: ADD_COMMENT_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    //put = action 을 dispatch
    console.error(err);
    yield put({
      type: ADD_COMMENT_FAILURE,
      data: err.response.data,
    });
  }
}

function removeCommentAPI(data: any) {
  return axios.delete("/api/post", data);
}

function* removePost(action: AnyAction) {
  try {
    // const result = yield call(logInAPI, action.data);
    yield delay(1000);
    const id = shortId.generate();
    yield put({
      type: REMOVE_POST_SUCCESS,
      data: action.data,
    });
    yield put({
      type: REMOVE_POST_OF_ME,
      data: action.data,
    });
  } catch (err) {
    //put = action 을 dispatch
    yield put({
      type: REMOVE_POST_FAILURE,
      data: err.response.data,
    });
  }
}

function* watchLoadPosts() {
  yield throttle(5000, LOAD_POSTS_REQUEST, loadPosts);
}

function* watchAddPost() {
  yield takeLatest(ADD_POST_REQUEST, addPost);
}

function* watchRemovePost() {
  yield takeLatest(REMOVE_POST_REQUEST, removePost);
}

function* watchAddComment() {
  yield takeLatest(ADD_COMMENT_REQUEST, addComment);
}

export default function* postSaga() {
  yield all([fork(watchAddPost), fork(watchLoadPosts), fork(watchAddComment), fork(watchRemovePost)]);
}
