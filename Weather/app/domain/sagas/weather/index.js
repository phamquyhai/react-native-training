import { takeLatest, all } from 'redux-saga/effects';

import types from '~/domain/types';
import doFetchData from '~/domain/sagas/weather/doFetchData';

export default [
  function* fetchWatcher() {
    yield all([takeLatest(types.weather.doFetchData, doFetchData)]);
  },
];
