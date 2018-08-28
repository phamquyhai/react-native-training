import types from '~/domain/types';

const initData = {
  cityId: '353412',
  cityName: 'Hà Nội',
  unit: 'C',
  currentData: {
    temp: null, // { c: 30, f: 70 }
    tempMin: null, // { c: 30, f: 70 }
    tempMax: null, // { c: 30, f: 70 }
    text: null,
    icon: null,
  },
  forecastData: {},
  isFetching: false,
  lastUpdate: null,
};

export default (state = initData, { type, payload }) => {
  switch (type) {
    case types.weather.repeatData:
      return {
        ...state,
        currentData: payload.currentData,
        forecastData: payload.forecastData,
        lastUpdate: payload.lastUpdate,
      };
    case types.weather.repeatUnit:
      return { ...state, unit: payload };
    case types.weather.repeatFetching:
      return { ...state, isFetching: payload };
    default:
      return state;
  }
};
