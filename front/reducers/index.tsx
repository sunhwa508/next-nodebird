import { Action } from '../type/index'
import { HYDRATE } from 'next-redux-wrapper';

const initialState = {
    user: {
        isLoggedIn: false,
        user: null,
        signUpData: {},
        loginData: {},
    },
    post: {
        mainPosts: []
    }
};

export const loginAction = (data: { id: string, password: string }) => {
    return {
        type: 'LOG_IN',
        data,
    }
}

export const logoutAction = () => {
    return {
        type: 'LOG_OUT',
    }
}

// action creator
const changeNickname = (data: string) => {
    return {
        type: 'CHANGE_NICKNAME',
        data,
    }
}

changeNickname('somi')

// (이전상태, 액션) => (변경된)다음상태
const rootReducer: any = (state = initialState, action: Action) => {
    switch (action.type) {
        case HYDRATE:
            return { ...state, ...action.payload }
        case 'LOG_IN':
            return {
                ...state,
                user: {
                    ...state,
                    isLoggedIn: true,
                    user: action.data
                }
            };
        case 'LOG_OUT':
            return {
                ...state,
                user: {
                    ...state,
                    isLoggedIn: false,
                    user: null,
                }
            };
        default:
            return state;
    }
}

export default rootReducer;