import {
    UserActionTypes
} from './user.type';

const INITIAL_STATE = {
    currentUser: null,
    awaitingAuthentication: false,
    authenticated: false,
    registeredUser: false
}

const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case UserActionTypes.REGISTER_USER:
            return {
                ...state,
                registeredUser: true,
                awaitingAuthentication: false
            }
        case UserActionTypes.LOGIN_LOCAL:
            return {
                ...state,
                awaitingAuthentication: false,
                authenticated: true,
                currentUser: action.data
            };
        case UserActionTypes.LOGIN_THIRD_PARTY:
            return {
                ...state,
                authenticated: true,
                currentUser: action.data
            };
        case UserActionTypes.LOGOUT_USER:
            return {
                ...state,
                currentUser: null,
                awaitingAuthentication: false,
                authenticated: false,
                registeredUser: false
            };
            default:
                return state;
    }
}

export default userReducer;