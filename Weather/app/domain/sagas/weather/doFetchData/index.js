import { call, put } from 'redux-saga/effects';

import { doFetchData, repeatFetching } from '~/domain/actions/weather';

export default function* () {
  yield put(repeatFetching(true));
  // call api
  // let data = api.get...
  // yield put(doFetchData(data));
  yield put(repeatFetching(false));
}
