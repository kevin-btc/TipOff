import { createStore } from 'redux';
import userReducer from './Reducers/userReducer';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const rootPersistConfig = {
	key: 'root',
	storage: storage,
};

export default createStore(persistReducer(rootPersistConfig, userReducer));
