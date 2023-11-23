const multer = require('multer');
const sharp = require('sharp');
const Product = require('../Models/productModel');


const multerStorage = multer.memoryStorage();

// Multer Filter
const multerFilter = (req, file, cb) => {
  console.log(file.mimetype);
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
    console.log(req.files.images.length);
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
  uploadProductImages,
  resizeProductImages
};