
const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({

    userid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    products: [{
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product'
        },
        quantity: {
            type: Number,
            default: 1
        }
    }]
}, { collection: 'cart' });

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;
