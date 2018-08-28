export const getTempFromUnit = (temp, unit) => {
  if (!temp) return '--';
  if (unit === 'C') {
    return temp.c;
  }
  return temp.f;
};
