const express = require('express');
const router = express.Router();
const Crypto = require('../models/Crypto');

router.get('/deviation', async (req, res) => {
  const { coin } = req.query;
  if (!coin) return res.status(400).send({ error: 'Coin is required' });

  try {
    const cryptos = await Crypto.find({ coin }).sort({ createdAt: -1 }).limit(100);
    if (!cryptos) return res.status(404).send({ error: 'Coin not found' });

    const prices = cryptos.map((crypto) => crypto.price);
    const mean = prices.reduce((a, b) => a + b, 0) / prices.length;
    const variance = prices.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / prices.length;
    const deviation = Math.sqrt(variance);

    res.send({ deviation });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Internal Server Error' });
  }
});

module.exports = router;