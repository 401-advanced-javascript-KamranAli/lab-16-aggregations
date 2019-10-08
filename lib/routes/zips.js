// eslint-disable-next-line new-cap
const router = require('express').Router();
const Zips = require('../models/zip');

router
  .get('/', (req, res, next) => {
    Zips.find()
      .lean()
      .then(zips => res.json(zips))
      .catch(next);
  })

  .get('/topTen', (req, res, next) => {
    Zips.topTen()
      .then(zips => res.json(zips))
      .catch(next);
  });



module.exports = router;