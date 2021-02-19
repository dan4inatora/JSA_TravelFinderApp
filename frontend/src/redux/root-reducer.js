import {combineReducers} from 'redux';
import {persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import userReducer from './user/user.reducer';
import amadeusReducer from './amadeus/amadeus.reducer';

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['user', 'amadeus']
    //whitelist prop shows what the reducer has to persist
}

const rootReducer = combineReducers({
    user: userReducer,
    amadeus: amadeusReducer
});

export default persistReducer(persistConfig, rootReducer);