import {combineReducers} from 'redux';
import {persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import userReducer from './user/user.reducer';
import amadeusReducer from './amadeus/amadeus.reducer';
import userSearchedReducer from './userSearched/userSearched.reducer';

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['user', 'amadeus']
    //whitelist prop shows what the reducer has to persist
}

const rootReducer = combineReducers({
    user: userReducer,
    amadeus: amadeusReducer,
    userSearched: userSearchedReducer
});

export default persistReducer(persistConfig, rootReducer);