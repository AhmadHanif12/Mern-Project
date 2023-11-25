const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const User = require('../Models/userModel');
const mongoose = require('mongoose');

const addToCart = async (req, res) => {
    try {
        let token;
        if (
            req.headers.authorization &&
            req.headers.authorization.startsWith('Bearer')
        ) {
            token = req.headers.authorization.split(' ')[1];
        }
        
        const productId = new mongoose.Types.ObjectId(req.body._id);
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.id;
        // Find the user and the cart item with the given product
        const user = await User.findById(userId);
        const cartItemIndex = user.products.findIndex(item => item && item._id.equals(productId));
        if (cartItemIndex !== -1) {
            user.products[cartItemIndex].quantity += 1;
        }
        else {
            // If the product is not in the cart, add it with quantity 1
            user.products.push({ _id: productId, quantity: 1 });
        }

        // Save the updated user with the modified cart
        const updatedUser = await User.findOneAndUpdate({_id: userId}, user, { new: true, upsert: true });

        return res.status(200).json({
            status: 'success',
            message: 'Product updated to cart successfully',
            user: updatedUser,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: 'error',
            error,
        });
    }
};

const getCart = async (req, res) => {
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
        const user = await User.findById(userId, { products: 1 });
        return res.status(200).json({
            status: 'success',
            message: 'Cart fetched successfully',
            user: user,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: 'errorr',
            error,
        });
    }
}


module.exports = {
    addToCart,
    getCart
}
