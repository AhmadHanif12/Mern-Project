const express = require('express');
const productController = require('../Controllers/productController');

const router = express.Router();

router.get('/myProducts', productController.getSellerProducts);
router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById);
router.post('/', productController.addProduct);
router.patch('/:id', productController.uploadProductImages, productController.resizeProductImages, productController.updateProductById);
router.put('/:id', productController.updateProductById);
router.delete('/:id', productController.deleteProductById);
module.exports = router;