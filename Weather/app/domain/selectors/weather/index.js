export const getCurrentData = state => state.weather.currentData || null;

export const isFetching = state => state.weather.isFetching || false;

export default {
  getCurrentData,
  isFetching,
};
