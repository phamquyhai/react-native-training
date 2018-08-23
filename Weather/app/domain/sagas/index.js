import { fork, all } from 'redux-saga/effects';

import weather from '~/domain/sagas/weather';

/* eslint-disable */
const sagas = function*() {
  yield all([...weather.map(watcher => fork(watcher))]);
};
export default sagas;
