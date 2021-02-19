export const AmadeusReduxActions = {
    PUT_ACCESS_TOKEN: "PUT_ACCESS_TOKEN"
}

export const retrieveAccessToken = accessToken => ({
    type: AmadeusReduxActions.PUT_ACCESS_TOKEN,
    payload: accessToken
});