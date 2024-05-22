//better-reads/routes/api/users.js

const express = require('express');
const router = express.Router();
const usersCtrl = require('../../controllers/api/users');
const ensureLoggedIn = require('../../config/ensureLoggedIn');

// All paths start with '/api/users'

// POST /api/users (create a user - sign up)
router.post('/', usersCtrl.create); // Should not have middleware
// POST /api/users/login
router.post('/login', usersCtrl.login); // Should not have middleware
// POST /api/users/:userId/lists/:listName
router.post('/:userId/lists/:listName', ensureLoggedIn, usersCtrl.createList); // Should have middleware

module.exports = router;
