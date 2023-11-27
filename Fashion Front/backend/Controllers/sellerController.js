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
            const sellers = await User.find({role: 'seller'});
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

// const getCart = async (req, res) => {
//     try {
//         let token;
//         if (
//             req.headers.authorization &&
//             req.headers.authorization.startsWith('Bearer')
//         ) {
//             token = req.headers.authorization.split(' ')[1];
//         }

//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         const userId = decoded.id;
//         // Find the user and the cart item with the given product
//         const user = await User.findById(userId, { products: 1 });
//         return res.status(200).json({
//             status: 'success',
//             message: 'Cart fetched successfully',
//             user: user,
//         });
//     } catch (error) {
//         console.log(error);
//         return res.status(500).json({
//             status: 'errorr',
//             error,
//         });
//     }
// }

// const updateCart = async (req, res) => {
//     try {
//         let token;
//         if (
//             req.headers.authorization &&
//             req.headers.authorization.startsWith('Bearer')
//         ) {
//             token = req.headers.authorization.split(' ')[1];
//         }
//         const productId = new mongoose.Types.ObjectId(req.body._id);
//         const productQuantity = req.body.quantity;
//         //console.log(productId, productQuantity);
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         const userId = decoded.id;
//         // Find the user and the cart item with the given product
//         const user = await User.findById(userId);
//         const product = await Product.findOne(productId);
//         //console.log(user, product)
//         const cartItemIndex = user.products.findIndex(item => item && item._id.equals(productId));
//         if (productQuantity <= product.stock && cartItemIndex !== -1) {
//             user.products[cartItemIndex].quantity = productQuantity;
//         } else {
//             if (cartItemIndex === -1) {
//                 return res.status(400).json({
//                     status: 'Bad Request',
//                     message: 'Product Don\'t Exist in your cart'
//                 });
//             }
//             return res.status(400).json({
//                 status: 'Bad Request',
//                 message: 'Out of Stock!'
//             });
//         }

//         // Save the updated user with the modified cart
//         const updatedUser = await User.findOneAndUpdate({ _id: userId }, user, { new: true, upsert: true });

//         return res.status(200).json({
//             status: 'success',
//             message: 'Product updated to cart successfully',
//             user: updatedUser,
//         });
//     } catch (error) {
//         console.log(error);
//         return res.status(500).json({
//             status: 'Internal Server error',
//             error,
//         });
//     }

// }


module.exports = {
    getAllSellers
}
