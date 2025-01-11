const express = require('express');
const router = express.Router();
const Crypto = require('../models/crypto');

router.get('/', async (req, res) => {
  const { coin } = req.query;
  if (!coin) return res.status(400).send({ error: 'Coin is required' });

  try {
    const crypto = await Crypto.findOne({ coin });
    if (!crypto) return res.status(404).send({ error: 'Coin not found' });
    res.send(crypto);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Internal Server Error' });
  }
});

module.exports = router;