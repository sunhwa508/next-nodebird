import { all, fork } from 'redux-saga/effects'

import PostSaga from './post'
import userSaga from './user'

// rootSaga를 만들고 우리가 하고싶은 비동기 함수들을 넣어준다. 
export default function* rootSaga() {
    yield all([
        fork(PostSaga),
        fork(userSaga),
    ])
}