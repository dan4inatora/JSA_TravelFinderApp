import {
    UserActionTypes
} from './user.type';

const INITIAL_STATE = {
    currentUser: null,
    awaitingAuthentication: false,
    authenticated: false,
    registeredUser: false,
    isAdmin: false
}

const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case UserActionTypes.REGISTER_USER:
            return {
                ...state,
                registeredUser: true,
                awaitingAuthentication: false,
                currentUser: action.payload
            }
        case UserActionTypes.LOGIN_LOCAL:
            return {
                ...state,
                awaitingAuthentication: false,
                authenticated: true,
                currentUser: action.payload
            };
        case UserActionTypes.LOGIN_THIRD_PARTY:
            return {
                ...state,
                authenticated: true,
                currentUser: action.payload
            };
        case UserActionTypes.LOGOUT_USER:
            return {
                ...state,
                currentUser: null,
                awaitingAuthentication: false,
                authenticated: false,
                registeredUser: false,
                isAdmin: false
            };
        case UserActionTypes.LOGIN_ADMIN:
            return {
                ...state,
                currentUser: action.payload,
                awaitingAuthentication: false,
                authenticated: true,
                isAdmin: true
            }
            default:
                return state;
    }
}

export default userReducer;