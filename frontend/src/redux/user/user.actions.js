import {UserActionTypes} from './user.type';

export const setCurrentUser = user => ({
    type: UserActionTypes.SET_CURRENT_USER,
    payload: user
});

export const registerUser = registerData => ({
    type: UserActionTypes.REGISTER_USER,
    payload: registerData
});

export const loginUserLocal = loginData => ({
    type: UserActionTypes.LOGIN_LOCAL,
    payload: loginData
});

export const loginUserThirdParty = user => ({
    type: UserActionTypes.LOGIN_THIRD_PARTY,
    payload: user
});

export const logoutUser = () => ({
    type: UserActionTypes.LOGOUT_USER
});