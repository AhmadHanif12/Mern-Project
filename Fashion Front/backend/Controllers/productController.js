const multer = require('multer');


const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb('Not an image! Please upload only images.', false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter
});

const uploadProductImages = (req, res, next) => {
  upload.fields([{ name: 'images', maxCount: 5 }])(req, res, (err) => {
    if (err) {
      return res.status(400).json({ error: err });
    }
    next();
  });
};


// productController.js
const Product = require('../Models/productModel');

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// function to get product by id

const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// function to add product
const addProduct = async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(400).json({ error: error || 'Bad Request' });
  }
};

// function to update product by id
const updateProductById = async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body
    );
    if (!updatedProduct) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(updatedProduct);
  } catch (error) {
    res.status(400).json({ error: 'Bad Request' });
  }
};

// function to delete product by id

const deleteProductById = async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndRemove(req.params.id);
    if (!deletedProduct) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(deletedProduct);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  addProduct,
  updateProductById,
  deleteProductById,
  uploadProductImages
};