//better-reads/routes/api/users.js

const express = require('express');
const router = express.Router();
const usersCtrl = require('../../controllers/api/users');
const ensureLoggedIn = require('../../config/ensureLoggedIn');

// All paths start with '/api/users'

// POST /api/users (create a user - sign up)
router.post('/', usersCtrl.create);
// POST /api/users/login
router.post('/login', usersCtrl.login);
// POST /api/users/:userId/lists/:listName
router.post('/:userId/lists/:listName', ensureLoggedIn, usersCtrl.createList);
// Route to handle adding a book to a user's list
router.post('/me/lists/:listName/books', ensureLoggedIn, usersCtrl.addBookToList);
// Route to fetch a specific list
router.get('/me/lists/:listName', ensureLoggedIn, usersCtrl.getListByName);
// Route to fetch all lists for the current user
router.get('/me/lists', ensureLoggedIn, usersCtrl.getLists);

router.get('/:userId', ensureLoggedIn, usersCtrl.getUser); 
router.put('/update', ensureLoggedIn, usersCtrl.updateUser);

module.exports = router;
