import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import { AsyncStorage } from 'react-native';

import weather from '~/domain/reducers/weather';

const rootPersistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const rootReducer = combineReducers({
  weather,
});

export default persistReducer(rootPersistConfig, rootReducer);
