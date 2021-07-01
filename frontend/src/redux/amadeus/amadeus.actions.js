export const AmadeusReduxActions = {
    PUT_ACCESS_TOKEN: "PUT_ACCESS_TOKEN",
    SELECT_CURRENT_DESTINATION: "SELECT_CURRENT_DESTINATION"
}

export const retrieveAccessToken = accessToken => ({
    type: AmadeusReduxActions.PUT_ACCESS_TOKEN,
    payload: accessToken
});

export const selectCurrentDestination = currentDestination => ({
    type: AmadeusReduxActions.SELECT_CURRENT_DESTINATION,
    payload: currentDestination
});