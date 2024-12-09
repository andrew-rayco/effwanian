export const compareCircuits = (a: any, b: any) => {
  const aCountry = a.Location.country;
  const bCountry = b.Location.country;
  if (aCountry < bCountry) {
    return -1;
  }
  if (aCountry > bCountry) {
    return 1;
  }
  return 0;
};
