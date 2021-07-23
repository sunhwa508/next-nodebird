import { AnyAction } from 'redux'
export interface InitialUserProps {
    isLoggedIn: boolean,
    isLoggingIn: boolean,
    isLoggingOut: boolean,
    me: null | {
        id: number,
        nickname: string,
    },
    signUpData: {},
    loginData: {}
}

const initialUserState: InitialUserProps = {
    isLoggedIn: false,
    isLoggingIn: false, //로그인시도중
    isLoggingOut: false, //로그아웃시도중
    me: {
        id: 1,
        nickname: 'sunhwa',
    },
    signUpData: {},
    loginData: {},
};

// action creator
export const loginRequestAction = (data: { id: string, password: string }) => {
    return {
        type: 'LOG_IN_REQUEST',
        data,
    }
}

export const loginSuccessAction = (data: { id: string, password: string }) => {
    return {
        type: 'LOG_IN_SUCCESS',
        data,
    }
}

export const loginFailureAction = (data: { id: string, password: string }) => {
    return {
        type: 'LOG_IN_FAILURE',
        data,
    }
}

//원칙적으로 3단계로 이루어져 있다. 
export const logoutRequestAction = () => {
    return {
        type: 'LOG_OUT_REQUEST',
    }
}

export const logoutSuccessAction = () => {
    return {
        type: 'LOG_OUT_SUCCESS',
    }
}

export const logoutFailureAction = () => {
    return {
        type: 'LOG_OUT_FAILURE',
    }
}

const reducer = (state = initialUserState, action: AnyAction) => {
    switch (action.type) {
        case 'LOG_IN_REQUEST':

            return {
                ...state,
                isLoggingIn: true,
            };
        case 'LOG_IN_SUCCESS':
            return {
                ...state,
                isLoggingIn: false,
                isLoggedIn: true,
                me: { ...action.data, nickname: 'sunhwacho' },
            };
        case 'LOG_IN_FAILURE':
            return {
                ...state,
                isLoggingIn: false,
            };

        case 'LOG_OUT_REQUEST':
            return {
                ...state,
                isLoggingOut: true,
            };
        case 'LOG_OUT_SUCCESS':
            return {
                ...state,
                isLoggedIn: false,
                isLoggingOut: false,
                me: null,
            };
        case 'LOG_OUT_FAILURE':
            return {
                ...state,
                isLoggingOut: false,
            };
        default:
            return state;
    }
}

export default reducer