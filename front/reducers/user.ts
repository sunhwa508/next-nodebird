import { AnyAction } from 'redux'
export interface InitialUserProps {
    isLoggedIn: boolean,
    me: null | {
        id: number,
        nickname: string,
    },
    signUpData: {},
    loginData: {}
}

const initialUserState: InitialUserProps = {
    isLoggedIn: false,
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
        case 'LOG_IN':
            return {
                ...state,
                isLoggedIn: true,
                me: action.payload
            };
        case 'LOG_OUT':
            return {
                ...state,
                isLoggedIn: false,
                me: null,
            };
        default:
            return state;
    }
}

export default reducer