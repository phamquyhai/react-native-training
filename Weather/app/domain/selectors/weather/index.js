export const getCurrentData = state => state.weather.currentData;

export const isFetching = state => state.weather.isFetching;

export default {
  getCurrentData,
  isFetching,
};
