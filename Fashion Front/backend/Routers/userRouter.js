const express = require('express');
const userController = require('./../Controllers/userController');
const authController = require('./../Controllers/authController');

const router = express.Router();

//Routes to use requests received from the client side
router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.get('/logout', authController.logout);

module.exports = router;