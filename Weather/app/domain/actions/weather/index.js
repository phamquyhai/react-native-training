import types from '~/domain/types';

export const doFetchData = payload => ({
  type: types.weather.doFetchData,
  payload,
});

export const repeatFetching = payload => ({
  type: types.weather.repeatFetching,
  payload,
});

export default {
  doFetchData,
  repeatFetching,
};
