const express = require('express');
const router = express.Router();
const booksController = require('../../controllers/api/booksController');
const ensureLoggedIn = require('../../config/ensureLoggedIn');

router.get(
  '/',
  ensureLoggedIn,
  (req, res, next) => {
    console.log('API /api/books called');
    next();
  },
  booksController.getBooks
);

router.post('/create', booksController.createBook);
router.get('/details/:bookId', ensureLoggedIn, booksController.getBookDetails);

module.exports = router;
