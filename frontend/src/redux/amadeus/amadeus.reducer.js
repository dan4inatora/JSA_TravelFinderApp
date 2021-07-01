import { AmadeusReduxActions } from './amadeus.actions';

const INITIAL_STATE = {
    accessToken: '',
    currentSelectedDestination: null
}

const amadeusReducer = (state= INITIAL_STATE, action) => {
    switch(action.type) {
        case AmadeusReduxActions.PUT_ACCESS_TOKEN:
            return {
                ...state,
                accessToken: action.payload,
            }
        case AmadeusReduxActions.SELECT_CURRENT_DESTINATION: {
            return {
                ...state,
                currentSelectedDestination: action.payload
            }
        }
        default:
            return state;
    }
}

export default amadeusReducer;