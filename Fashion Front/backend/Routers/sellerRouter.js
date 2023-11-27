
const express = require('express');
const sellerController = require('../Controllers/sellerController');

const router = express.Router();

// Import the addToCart function from your desired location

// Define the route to call the addToCart function
//router.post('/', cartController.addToCart);
router.get('/', sellerController.getAllSellers);
router.get('/:id', sellerController.getSellerById);
router.delete('/', sellerController.deleteSellerbyId);

//router.patch('/', cartController.updateCart);
module.exports = router;
