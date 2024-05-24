const express = require('express');
const router = express.Router();
const authCtrl = require('../../controllers/api/auth');

router.post('/refresh-token', authCtrl.refreshToken);

module.exports = router;
