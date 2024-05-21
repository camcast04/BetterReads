const express = require('express');
const router = express.Router();
const booksController = require('../../controllers/api/booksController');
const ensureLoggedIn = require('../../config/ensureLoggedIn');

// Route for Google Books API
// router.get('/', ensureLoggedIn, booksController.getBooks);

router.get('/', ensureLoggedIn, (req, res, next) => {
    console.log('API /api/books called');
    next();
}, booksController.getBooks);

module.exports = router;