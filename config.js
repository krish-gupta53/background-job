require('dotenv').config();
const apikey = process.env.COINGECKO_API_KEY;
const apiBaseUrl = 'https://api.coingecko.com/api/v3';

module.exports = { apikey, apiBaseUrl };
