const express = require('express');
const UserController = require('./../Controller/UserController')

const router = express.Router();

router.post('/signup', UserController.signup);
router.post('/login', UserController.login);

module.exports = router;