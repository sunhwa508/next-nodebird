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