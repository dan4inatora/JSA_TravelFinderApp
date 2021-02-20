import {UserSearchedActions} from './userSearched.actions';

const INITIAL_STATE = {
    userSearched: {}
}

function checkForDuplicateKey(cityCode, state) {
    let newState = {...state};
    if(newState.userSearched) {
        for(var key in newState.userSearched) {
            if(newState.userSearched.hasOwnProperty(cityCode)) {
                newState.userSearched[key]++;
                return newState.userSearched;
            }
        }
    
        newState.userSearched[cityCode] = 1;
    }
    
    return newState.userSearched;
}

const userSearchedReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case UserSearchedActions.ADD_RECOMMENDATION:
            return {
                ...state,
                userSearched: checkForDuplicateKey(action.payload, state),
            }
        default:
            return state;
    }
}

export default userSearchedReducer;