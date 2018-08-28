export const getCurrentData = state => state.weather.currentData || null;
export const getWeather = state => state.weather || null;
export const getUnit = state => state.weather.unit || 'C';
export const getCityId = state => state.weather.cityId || '353412';
export const getLastUpdate = state => state.weather.lastUpdate || null;
export const isFetching = state => state.weather.isFetching || false;

export default {
  getWeather,
  getCurrentData,
  getUnit,
  getCityId,
  getLastUpdate,
  isFetching,
};
