
const axios = require('axios');

const coingeckoApi = axios.create({
  baseURL: 'https://api.coingecko.com/api/v3/'
});

module.exports = coingeckoApi;