import { AnyAction } from 'redux'
export interface InitialUserProps {
    isLoggedIn: boolean,
    user: null | {},
    signUpData: {},
    loginData: {}
}

const initialUserState: InitialUserProps = {
    isLoggedIn: false,
    user: null,
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
                user: action.payload
            };
        case 'LOG_OUT':
            return {
                ...state,
                isLoggedIn: false,
                user: null,
            };
        default:
            return state;
    }
}

export default reducer