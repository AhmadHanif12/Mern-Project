const express = require('express');
const productController = require('../Controllers/productController');


const router = express.Router();


router.get('/:category', productController.getProductsByCategory);
module.exports = router;
