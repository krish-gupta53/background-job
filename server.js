require('dotenv').config();
const express = require('express');
const app = express();
const cron = require('node-cron');
const fetchCryptoData = require('./jobs/cryptoData');
const mongoose = require('mongoose');
const deviationRouter = require('./routes/Sdeviation');
const reData= require('./routes/reqData')
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

cron.schedule('0 */2 * * *', fetchCryptoData);
fetchCryptoData();
app.use('/stats', reData);
app.use('/api', deviationRouter);

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});