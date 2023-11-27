const express = require('express');
const productController = require('../Controllers/productController');

const router = express.Router();

router.get('/', productController.getSellerProducts);

module.exports = router;