const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter Product Name."],
    trim: true
  },
  description: {
    type: String,
    trim: true,
    maxLength: [2000, "Length Exceeds 2000 characters"],
    required: [true, "Please Enter Product Description."]
  },
  price: {
    type: Number,
    required: [true, "Please Enter Product Price."],
    min: 1
  },
  category: {
    type: String,
    trim: true,
    enum: ['men', 'women', 'kids', 'clearance', 'minor-fault'],
    required: [true, "Please Select Product Category."]
  },
  brand: {
    type: String,
    trim: true,
    required: [true, "Please Enter Product Brand."]
  },
  sizes: {
    type: [String],
    //required: [true, "Please Enter Product Sizes."]
  },
  stock: {
    type: Number,
    //required: [true, "Please Enter Product Quantity."],
    min: 0
  },
  images: {
    type: [String],
    required: [true, "Please Enter Product Images."]
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  verified: {
    type: Boolean,
    default: false
  }
}, {collection: 'product'});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
