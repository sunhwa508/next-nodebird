
import { HYDRATE } from 'next-redux-wrapper';
import { AnyAction, combineReducers } from 'redux'
import user, { InitialUserProps } from './user'
import post, { InitialPostProps } from './post'

// 원래의 형태는 아래와 같지만 서버사이드 렌더링을 위해서 HYDRATE 부분을 추가해 준 것
// const rootReducer = combineReducers({
//     user,
//     post,
// })

export interface rootType {
    user: InitialUserProps,
    post: InitialPostProps
}
// (이전상태, 액션) => (변경된)다음상태
const rootReducer = combineReducers({
    index: (state = {}, action: AnyAction) => {
        switch (action.type) {
            case HYDRATE:
                console.log("HYDRATE", action);
                return action.payload;
            default:
                return state;
        }
    },
    user,
    post,
});





export default rootReducer;