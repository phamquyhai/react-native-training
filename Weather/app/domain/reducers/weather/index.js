import types from '~/domain/types';

const initData = {
  currentData: {
    temp: 20,
    minTemp: 21,
    maxTemp: 30,
    icon: 1,
    status: 'Cloudy',
  },
  forecastData: null,
  isFetching: false,
};

export default (state = initData, { type, payload }) => {
  switch (type) {
    case types.weather.repeatData:
      return { ...state, currentData: payload.currentData, forecastData: payload.forecastData };
    case types.weather.repeatFetching:
      return { ...state, isFetching: payload };
    default:
      return state;
  }
};
