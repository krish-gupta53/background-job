const coingeckoApi = require('../utils/coingecko');
const Crypto = require('../models/crypto');

const cryptoData = async () => {
  try {
    const coins = ['bitcoin', 'matic-network', 'ethereum'];
    const promises = coins.map((coin) =>
      coingeckoApi.get(`coins/markets`, {
        params: {
          vs_currency: 'usd',
          ids: coin
        }
      })
    );
    const responses = await Promise.all(promises);

    responses.forEach((response, index) => {
      const coin = coins[index];
      const price = response.data[0].current_price;
      const marketCap = response.data[0].market_cap;
      const change = response.data[0].price_change_percentage_24h;

      const crypto = new Crypto({ coin, price, marketCap, change, createdAt: new Date() });
      crypto.save((err) => {
        if (err) console.error(err);
        console.log(`Saved ${coin} data`);
      });
    });
  } catch (error) {
    console.error(error);
  }
};

module.exports = cryptoData;