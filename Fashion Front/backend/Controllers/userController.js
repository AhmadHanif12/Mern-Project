const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const User = require('../Models/userModel');
const Product = require('../Models/productModel');
const mongoose = require('mongoose');




const getuserbyId = async (req, res) => {
    try {
        let token;
        if (
            req.headers.authorization &&
            req.headers.authorization.startsWith('Bearer')
        ) {
            token = req.headers.authorization.split(' ')[1];
        }

        if (!token) {
            return res.status(401).json({
                status: 'Failed',
                message: 'Token must be provided'
            });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.id;
        // Find the user and the cart item with the given product
        
        const user = await User.findById(userId);
        console.log(user)
        return res.status(200).json({
            status: 'success',
            data: user
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: 'error',
            error,
        });
    }
};


module.exports = {
    getuserbyId
}
