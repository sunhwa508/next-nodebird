import { AnyAction } from 'redux'
export interface InitialUserProps {
    followLoading: boolean,
    followDone: boolean,
    followError: null | boolean,
    unfollowLoading: boolean,
    unfollowDone: boolean,
    unfollowError: boolean | null,
    logInDone: boolean,
    logInError: boolean | null,
    logInLoading: boolean,
    logOutDone: boolean,
    logOutError: boolean | null,
    logOutLoading: boolean,
    signUpDone: boolean,
    signUpError: boolean | null,
    signUpLoading: boolean,
    me: null | {
        id: number,
        nickname: string,
        Followings: Array<{ nickname: string }>
        Followers: Array<{ nickname: string }>
    },
    signUpData: {},
    loginData: {},
}

export const initialState: InitialUserProps = {
    followLoading: false, // 팔로우 시도중
    followDone: false,
    followError: null,
    unfollowLoading: false, // 언팔로우 시도중
    unfollowDone: false,
    unfollowError: null,
    logInLoading: false, // 로그인 시도중
    logInDone: false,
    logInError: null,
    logOutLoading: false, // 로그아웃 시도중
    logOutDone: false,
    logOutError: null,
    signUpLoading: false, // 회원가입 시도중
    signUpDone: false,
    signUpError: null,
    me: null,
    signUpData: {},
    loginData: {},
};

const dummyUser = (data: { nickname: string, id: number }) => ({
    ...data,
    nickname: '선화',
    id: 1,
    posts: [],
    Followings: [],
    Followers: [],
})

export const LOG_IN_REQUEST = 'LOG_IN_REQUEST'
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS'
export const LOG_IN_FAILURE = 'LOG_IN_FAILURE'

export const LOG_OUT_REQUEST = 'LOG_OUT_REQUEST'
export const LOG_OUT_SUCCESS = 'LOG_OUT_SUCCESS'
export const LOG_OUT_FAILURE = 'LOG_OUT_FAILURE'

export const SIGN_UP_REQUEST = 'SIGN_UP_REQUEST'
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS'
export const SIGN_UP_FAILURE = 'SIGN_UP_FAILURE'

export const FOLLOW_REQUEST = 'FOLLOW_REQUEST'
export const FOLLOW_SUCCESS = 'FOLLOW_SUCCESS'
export const FOLLOW_FAILURE = 'FOLLOW_FAILURE'

export const UN_FOLLOW_REQUEST = 'UN_FOLLOW_REQUEST'
export const UN_FOLLOW_SUCCESS = 'UN_FOLLOW_SUCCESS'
export const UN_FOLLOW_FAILURE = 'UN_FOLLOW_FAILURE'

// action creator
export const loginRequestAction = (data: { email: string, password: string }) => {
    return {
        type: LOG_IN_REQUEST,
        data,
    }
}

export const loginSuccessAction = (data: { email: string, password: string }) => {
    return {
        type: LOG_IN_SUCCESS,
        data,
    }
}

export const loginFailureAction = (data: { email: string, password: string }) => {
    return {
        type: LOG_IN_FAILURE,
        data,
    }
}

//원칙적으로 3단계로 이루어져 있다. 
export const logoutRequestAction = () => {
    return {
        type: LOG_OUT_REQUEST,
    }
}

export const logoutSuccessAction = () => {
    return {
        type: LOG_OUT_SUCCESS,
    }
}

export const logoutFailureAction = () => {
    return {
        type: LOG_OUT_FAILURE,
    }
}

export const signUpRequestAction = () => {
    return {
        type: SIGN_UP_REQUEST,
    }
}

export const signUpSuccessAction = () => {
    return {
        type: SIGN_UP_SUCCESS,
    }
}

export const signUpFailureAction = () => {
    return {
        type: SIGN_UP_FAILURE,
    }
}

const reducer = (state = initialState, action: AnyAction) => {
    switch (action.type) {
        case LOG_IN_REQUEST:
            return {
                ...state,
                logInLoading: true,
                logInError: null,
                logInDone: false,
            };
        case LOG_IN_SUCCESS:
            return {
                ...state,
                logInLoading: false,
                logInDone: true,
                me: dummyUser(action.data),
            };
        case LOG_IN_FAILURE:
            return {
                ...state,
                logInLoading: false,
                logInError: action.error,
            };

        case LOG_OUT_REQUEST:
            return {
                ...state,
                logOutLoading: true,
                logOutDone: false,
                logOutError: null,
            };
        case LOG_OUT_SUCCESS:
            return {
                ...state,
                logOutLoading: false,
                logOutDone: true,
                logInDone: false,
                me: null,
            };
        case LOG_OUT_FAILURE:
            return {
                ...state,
                logOutLoading: false,
                logOutError: action.error
            };
        case SIGN_UP_REQUEST:
            return {
                ...state,
                signUpLoading: true,
                signUpDone: false,
                signUpError: null,
            };
        case SIGN_UP_SUCCESS:
            return {
                ...state,
                signUpLoading: false,
                signUpDone: true,
            };
        case SIGN_UP_FAILURE:
            return {
                ...state,
                signUpLoading: false,
                signUpError: action.error
            };
        default:
            return state;
    }
}

export default reducer