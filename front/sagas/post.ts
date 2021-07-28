import axios, { AxiosResponse } from 'axios';
import { all, delay, put, fork, takeLatest } from 'redux-saga/effects';
import { AnyAction } from 'redux';
import { rootType } from '../reducers';
import {
  ADD_POST_FAILURE,
  ADD_POST_REQUEST,
  ADD_POST_SUCCESS,
  ADD_COMMENT_REQUEST,
  ADD_COMMENT_SUCCESS,
  ADD_COMMENT_FAILURE,
} from '../reducers/post';

function addPostAPI(data: rootType): Promise<AxiosResponse<rootType>> {
  return axios.post('/api/post', data);
}

function* addPost(action: AnyAction) {
  console.log('action', action);
  try {
    // const result = yield call(logInAPI, action.data);
    yield delay(1000);
    yield put({
      type: ADD_POST_SUCCESS,
      data: action.data.text,
    });
  } catch (err) {
    //put = action 을 dispatch
    yield put({
      type: ADD_POST_FAILURE,
      data: err.response.data,
    });
  }
}

function addCommentAPI(data: rootType): Promise<AxiosResponse<rootType>> {
  return axios.post('/api/post/${data.postId}/comment', data);
}

function* addComment(action: AnyAction) {
  try {
    // const result = yield call(logInAPI, action.data);
    yield delay(1000);
    yield put({
      type: ADD_COMMENT_SUCCESS,
      data: action.data,
    });
  } catch (err) {
    //put = action 을 dispatch
    yield put({
      type: ADD_COMMENT_FAILURE,
      data: err.response.data,
    });
  }
}

function* watchAddPost() {
  yield takeLatest(ADD_POST_REQUEST, addPost);
}

function* watchAddComment() {
  yield takeLatest(ADD_COMMENT_REQUEST, addComment);
}

export default function* postSaga() {
  yield all([fork(watchAddPost), fork(watchAddComment)]);
}
