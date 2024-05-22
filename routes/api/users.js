//better-reads/routes/api/users.js

const express = require('express');
const router = express.Router();
const usersCtrl = require('../../controllers/api/users');
const ensureLoggedIn = require('../../config/ensureLoggedIn');

// All paths start with '/api/users'

// All paths start with '/api/users'

// POST /api/users (create a user - sign up)
router.post('/', usersCtrl.create); // Should not have middleware
// POST /api/users/login
router.post('/login', usersCtrl.login); // Should not have middleware
// GET /api/users/check-token
router.get('/check-token', ensureLoggedIn, usersCtrl.checkToken); // Should have middleware


module.exports = router;