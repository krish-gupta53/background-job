const axios = require('axios');
const { apikey, apiBaseUrl } = require('../config');

const coingeckoApi = axios.create({
  baseURL: apiBaseUrl,
  headers: {
    'x-cg-demo-api-key': apikey
  }
});

module.exports = coingeckoApi;