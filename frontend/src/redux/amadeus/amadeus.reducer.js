import { AmadeusReduxActions } from './amadeus.actions';

const INITIAL_STATE = {
    accessToken: ''
}

const amadeusReducer = (state= INITIAL_STATE, action) => {
    switch(action.type) {
        case AmadeusReduxActions.PUT_ACCESS_TOKEN:
            return {
                ...state,
                accessToken: action.payload,
            }
        default:
            return state;
    }
}

export default amadeusReducer;