const multer = require('multer');
const sharp = require('sharp');
const jwt = require('jsonwebtoken');
const Product = require('../Models/productModel');
const User = require('../Models/userModel');
const mongoose = require('mongoose');
const APIFeatures = require('../utils/apiFeatures');


const multerStorage = multer.memoryStorage();

// Multer Filter
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

const uploadProductImages = upload.fields([
  { name: 'images', maxCount: 5 }
]);

// Function to resize product images
const resizeProductImages = async (req, res, next) => {
  try {
    if (req.files.images.length === 0) return next();

    // 2) Images
    req.body.images = [];

    await Promise.all(
      req.files.images.map(async (file, i) => {
        const ext = file.mimetype.split('/')[1];
        const filename = `product-${req.params.id}-${Date.now()}-${i + 1}.${ext}`;
        await sharp(file.buffer)
          .resize(2000, 1333)
          .toFile(`public/img/products/${filename}`);

        const path = `http://localhost:8080/img/products/${filename}`;
        //console.log(filename);
        req.body.images.push(path);
        //console.log(req.body.images);
      })
    );

    next();
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// productController.js

const getAllProducts = async (req, res, next) => {
  try {
    const features = new APIFeatures(Product.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();
    const products = await features.query;
    // SEND RESPONSE
    res.status(200).json({
      status: 'success',
      results: products.length,
      data: {
        products
      }
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err
    });
  };
}

const getSellerProducts = async (req, res) => {
  try {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;
    // Find the user and the cart item with the given product
    const user = await User.findById(userId);
    console.log(user);
    if (!user || user.role === 'customer') {
      return res.status(404).json({
        status: 'fail',
        error: 'Please Login as a seller to view your products'
      });
    }
    const sellerProducts = await Product.find({ sellerId: userId });
    return res.status(200).json({
      status: 'success',
      data: sellerProducts
    })
  } catch (error) {
    console.log(error)
    res.status(400).json({ error: error || 'Bad Request' });
  }
}

// const getAllProducts = async (req, res) => {
//   try {
//     const products = await Product.find();
//     res.json(products);
//   } catch (error) {
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// };




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
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;
    // Find the user and the cart item with the given product
    const user = await User.findById(userId);
    if (!user || user.role === 'customer') {
      return res.status(404).json({
        status: 'fail',
        error: 'Please Login as a seller to add product'
      });
    }
    const newProduct = new Product({
      sellerId: new mongoose.Types.ObjectId(userId),
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      stock: req.body.stock,
      category: req.body.category,
      brand: req.body.brand,
    });
    //const newProduct = new Product(req.body);
    const savedProduct = await newProduct.save();
    res.status(201).json({
      status: 'success',
      savedProduct
    });
  } catch (error) {
    console.log(error)
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
  getSellerProducts,
  getAllProducts,
  getProductById,
  addProduct,
  updateProductById,
  deleteProductById,
  uploadProductImages,
  resizeProductImages
};