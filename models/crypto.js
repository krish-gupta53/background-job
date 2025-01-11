const mongoose = require('mongoose');

const cryptoSchema = new mongoose.Schema({
  coin: String,
  price: Number,
  marketCap: Number,
  change: Number,
  createdAt: Date
});

module.exports = mongoose.model('Crypto', cryptoSchema);