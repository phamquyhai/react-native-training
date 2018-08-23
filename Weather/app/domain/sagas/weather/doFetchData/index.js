import { call, put } from 'redux-saga/effects';

import { repeatData, repeatFetching } from '~/domain/actions/weather';

export default function* () {
  yield put(repeatFetching(true));
  // call api
  // let data = api.get...
  // yield put(repeatData(data));
  console.log('doFetchData ');
  yield put(repeatFetching(false));
}
