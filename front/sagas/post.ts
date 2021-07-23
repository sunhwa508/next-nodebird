import axios, { AxiosResponse } from "axios";
import { all, delay, put, fork, takeLatest } from "redux-saga/effects";
import { AnyAction } from 'redux'
import { rootType } from '../reducers'

function addPostAPI(data: rootType): Promise<AxiosResponse<rootType>> {
    return axios.post('/api/post', data)
}

function* addPost(action: AnyAction) {
    try {
        // const result = yield call(logInAPI, action.data);
        yield delay(1000);
        yield put({
            type: 'ADD_POST_SUCCESS',
        });
    }
    catch (err) {
        //put = action 을 dispatch
        yield put({
            type: 'ADD_POST_FAILURE',
            data: err.response.data
        });
    }
}

function* watchAddPost() {
    yield takeLatest('ADD_POST_REQUEST', addPost);
}

export default function* postSaga() {
    yield all([
        fork(watchAddPost),
    ])
}