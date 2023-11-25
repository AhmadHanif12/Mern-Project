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
        const userId = new mongoose.Types.ObjectId(decoded.id);
        const cartItem = await User.findOneAndUpdate(
            { _id:  userId },
            { $addToSet: { products: productId } },
            { new: true, upsert: true }
        );
        return res.status(200).json({
            status: 'success',
            message: 'Product Updated to Cart Successfully',
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: 'error',
            error
        });
    }
}


module.exports = {
    addToCart
}
