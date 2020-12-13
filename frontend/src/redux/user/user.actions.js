import {UserActionTypes} from './user.type';

export const registerUser = registerData => ({
    type: UserActionTypes.REGISTER_USER,
    payload: registerData
});

export const loginUserLocal = loginData => ({
    type: UserActionTypes.LOGIN_LOCAL,
    payload: loginData
});

export const loginAdmin = adminData => ({
    type: UserActionTypes.LOGIN_ADMIN,
    payload: adminData
})

export const loginUserThirdParty = user => ({
    type: UserActionTypes.LOGIN_THIRD_PARTY,
    payload: user
});

export const logoutUser = () => ({
    type: UserActionTypes.LOGOUT_USER
});