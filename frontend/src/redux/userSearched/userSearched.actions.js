export const UserSearchedActions = {
    ADD_RECOMMENDATION: "ADD_RECOMMENDATION"
}

export const addRecommendation = (cityCode) => ({
    type: UserSearchedActions.ADD_RECOMMENDATION,
    payload: cityCode
});