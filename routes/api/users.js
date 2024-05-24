//betterreads/routes/users.js

const express = require('express');
const router = express.Router();
const usersCtrl = require('../../controllers/api/users');
const ensureLoggedIn = require('../../config/ensureLoggedIn');

router.post('/', usersCtrl.create);
router.post('/login', usersCtrl.login);
router.post('/:userId/lists/:listName', ensureLoggedIn, usersCtrl.createList);
router.post(
  '/me/lists/:listName/books',
  ensureLoggedIn,
  usersCtrl.addBookToList
);
router.get('/me/lists/:listName', ensureLoggedIn, usersCtrl.getListByName);
router.get('/me/lists', ensureLoggedIn, usersCtrl.getLists);
router.get('/:userId', ensureLoggedIn, usersCtrl.getUser);
router.put('/update', ensureLoggedIn, usersCtrl.updateUser);
router.delete(
  '/me/lists/:listName/books/:bookId',
  ensureLoggedIn,
  usersCtrl.deleteBookFromList
);

module.exports = router;
