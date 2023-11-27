const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const User = require('../Models/userModel');
const Product = require('../Models/productModel');
const mongoose = require('mongoose');

const getAllSellers = async (req, res) => {
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
        if (user.role !== 'admin') {
            return res.status(401).json({
                status: 'Failed',
                message: 'You are not authorized to perform this action'
            })
        } else {
            const sellers = await User.find({ role: 'seller' });
            return res.status(200).json({
                status: 'success',
                data: sellers
            })
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: 'error',
            error,
        });
    }
};


const deleteSellerbyId = async (req, res) => {
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
        if (!user || user.role === 'customer' || user.role === 'seller') {
            return res.status(404).json({
                status: 'fail',
                error: 'Please Login as an Admin to Remove Seller'
            });
        }
        const deletedSeller = await User.findByIdAndDelete(req.params.id);
        const deletedProduct = await Product.deleteMany({ sellerId: req.params.id });
        if (!deletedSeller) {
            return res.status(404).json({ error: 'Seller not found' });
        }
        return res.status(200).json({
            status: 'success',
            data: deletedSeller
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const verifySellerbyId = async (req, res) => {

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
        const user = await User.findById(userId);
        if (!user || user.role === 'customer' || user.role === 'seller') {
            return res.status(404).json({
                status: 'fail',
                error: 'Please Login as an Admin to Verify Seller'
            });
        }
        const updatedSeller = await User.findByIdAndUpdate(req.params.id, req.body);
        res.status(200).json({
            status: 'success',
            data: updatedSeller
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};




module.exports = {
    getAllSellers,
    deleteSellerbyId,
    verifySellerbyId
}
