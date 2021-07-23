import { all, fork, takeLatest, delay, put } from "redux-saga/effects";
import axios, { AxiosResponse } from "axios"
import { AnyAction } from 'redux';

function logInAPI(data: { id: string, password: string }): Promise<AxiosResponse<{ id: string, password: string }>> {
    return axios.post('/api/login', data)
}

function* logIn(action: AnyAction) {
    try {
        // const result = yield call(logInAPI, action.data);
        yield delay(1000);
        yield put({
            type: 'LOG_IN_SUCCESS',
            data: action.data
        });
    }
    catch (err) {
        //put = action 을 dispatch
        yield put({
            type: 'LOG_IN_FAILURE',
            data: err.response.data
        });
    }
}

function* logOut(action: AnyAction) {
    try {
        // const result = yield call(logInAPI, action.data);
        yield delay(1000);
        yield put({
            type: 'LOG_OUT_SUCCESS',
        });
    }
    catch (err) {
        //put = action 을 dispatch
        yield put({
            type: 'LOG_OUT_FAILURE',
            data: err.response.data
        });
    }
}

// 이벤트 리스너 같은 느낌을 준다.
function* watchLogIn() {
    // LOG_IN 이라는 액션이 실행 될떄까지 기다리겠다.
    yield takeLatest('LOG_IN_REQUEST', logIn);
}

function* watchLogOut() {
    yield takeLatest('LOG_OUT_REQUEST', logOut);
}

export default function* userSage() {
    yield all([
        fork(watchLogIn),
        fork(watchLogOut),
    ])
}