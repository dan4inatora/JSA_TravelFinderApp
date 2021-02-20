import {UserSearchedActions} from './userSearched.actions';

const INITIAL_STATE = {
    userSearched: {}
}

function checkForDuplicateKey(cityCode, state) {
    let newState = state;
    if(newState.userSearched) {
        for(var key in newState.userSearched) {
            if(newState.userSearched.hasOwnProperty(cityCode)) {
                newState[key]++;
                return newState;
            }
        }
    
        newState.userSearched[cityCode] = 1;
    }
    
    return newState;
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