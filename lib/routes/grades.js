// eslint-disable-next-line new-cap
const router = require('express').Router();
const Grade = require('../models/grade');

router
  .get('/', (req, res, next) => {
    Grade.find()
      .lean()
      .then(grades => res.json(grades))
      .catch(next);
  })

  .get('/grade', (req, res, next) => {
    Grade.grade()
      .then(grades => res.json(grades))
      .catch(next);
  });

module.exports = router;
