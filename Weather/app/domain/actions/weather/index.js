import types from '~/domain/types';

export const doFetchData = payload => ({
  type: types.weather.doFetchData,
  payload,
});

export const repeatData = payload => ({
  type: types.weather.repeatData,
  payload,
});

export const repeatFetching = payload => ({
  type: types.weather.repeatFetching,
  payload,
});

export const repeatUnit = payload => ({
  type: types.weather.repeatUnit,
  payload,
});

export default {
  doFetchData,
  repeatFetching,
  repeatData,
  repeatUnit,
};
