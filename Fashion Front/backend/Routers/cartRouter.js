
const express = require('express');
const cartController = require('../Controllers/cartController');

const router = express.Router();

// Import the addToCart function from your desired location

// Define the route to call the addToCart function
router.post('/', cartController.addToCart);
router.get('/', cartController.getCart);
module.exports = router;
