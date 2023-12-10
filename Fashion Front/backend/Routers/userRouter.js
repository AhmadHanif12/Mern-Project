const express = require('express');
const userController = require('./../Controllers/userController');
const authController = require('./../Controllers/authController');
const sellerController = require('./../Controllers/sellerController');

const router = express.Router();

//Routes to use requests received from the client side
router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.get('/logout', authController.logout);


router.get('/', userController.getuserbyId);
router.get('/verify',authController.verifyUser)
router.delete('/:id', sellerController.deleteSellerbyId);
router.patch('/:id', sellerController.verifySellerbyId);

module.exports = router;