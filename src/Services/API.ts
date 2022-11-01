const BASEURL = "https://restcountries.com/v3.1";

export const getAllCountries = () => {
  return fetch(`${BASEURL}/all`);
};

export const getCountriesByRegion = (region: string) => {
  return fetch(`${BASEURL}/region/${region}`);
};

export const getCountryData = (country: string) => {
  return fetch(`${BASEURL}/name/${country}`);
};
