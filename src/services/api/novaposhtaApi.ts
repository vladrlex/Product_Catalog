import axios from 'axios';

const API_KEY = '2232407fd347ad73f613b3e9fdeea1da';

export const fetchCities = async (search: string) => {
  const response = await axios.post('https://api.novaposhta.ua/v2.0/json/', {
    apiKey: API_KEY,
    modelName: 'Address',
    calledMethod: 'getCities',
    methodProperties: {
      FindByString: search,
    },
  });
  return response.data.data;
};

export const fetchWarehouses = async (cityRef: string) => {
  const response = await axios.post('https://api.novaposhta.ua/v2.0/json/', {
    apiKey: API_KEY,
    modelName: 'Address',
    calledMethod: 'getWarehouses',
    methodProperties: {
      CityRef: cityRef,
    },
  });
  return response.data.data;
};
