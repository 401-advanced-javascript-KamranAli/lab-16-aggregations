// eslint-disable-next-line new-cap
const router = require('express').Router();
const Trade = require('../models/trade');

router
  .get('/', (req, res, next) => {
    Trade.find()
      .lean()
      .then(trades => res.json(trades))
      .catch(next);
  })

  .get('/tradeTop', (req, res, next) => {
    Trade.tradeTop()
      .then(trades => res.json(trades))
      .catch(next);
  })

  .get('/tradeBottom', (req, res, next) => {
    Trade.tradeBottom()
      .then(trades => res.json(trades))
      .catch(next);
  });

module.exports = router;