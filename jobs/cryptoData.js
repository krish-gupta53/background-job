
const coingeckoApi = require('../utils/coingecko');
const Crypto = require('../models/Crypto');

const cryptoData = async () => {
  try {
    const coins = ['bitcoin', 'matic-network', 'ethereum'];
    const promises = coins.map((coin) => coingeckoApi.get(`coins/${coin}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`));
    const responses = await Promise.all(promises);

    responses.forEach((response, index) => {
      const coin = coins[index];
      const price = response.data.market_data.current_price.usd;
      const marketCap = response.data.market_data.market_cap.usd;
      const change = response.data.market_data.price_change_percentage_24h;

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