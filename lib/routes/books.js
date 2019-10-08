// eslint-disable-next-line new-cap
const router = require('express').Router();
const Books = require('../models/book');

router
  .get('/', (req, res, next) => {
    Books.find()
      .lean()
      .then(book => res.json(book))
      .catch(next);
  })

  .get('/books', (req, res, next) => {
    Books.books()
      .then(books => res.json(books))
      .catch(next);
  });

module.exports = router;