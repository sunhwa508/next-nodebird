import { all, fork, call, put, take } from 'redux-saga/effects'
import axios, { AxiosResponse } from "axios"

function logInAPI() {
    return axios.post('/api/login')
}

function* login() {
    try {
        const result = yield call(logInAPI);
        yield put({
            type: 'LOG_IN_SUCCESS',
            data: result.data
        });
    }
    catch (err) {
        //put = action 을 dispatch
        yield put({
            type: 'LOG_IN_FAILURE',
            data: err.response.data
        })
    }
}

// 이벤트 리스너 같은 느낌을 준다.
function* watchLogIn() {
    // LOG_IN 이라는 액션이 실행 될떄까지 기다리겠다.
    yield take('LOG_IN_REQUEST', login);
}

function* watchLogOut() {
    yield take('LOG_OUT_REQUEST');
}

function* watchAddPost() {
    yield take('ADD_POST_REQUEST');
}

export default function* rootSaga() {
    yield all([
        fork(watchLogIn),
        fork(watchLogOut),
        fork(watchAddPost),
    ])
}