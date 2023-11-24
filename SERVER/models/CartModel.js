const mongoose = require('mongoose');

// define a cart model for the user (buyer)

const cartSchema = mongoose.Schema({ 
    buyerId: {
        type: String,
        required: true
    },
    myCart: [
        {
            productId: {
                type: String
            },
            sellerId: {
                type: String
            },
            title: {
                type: String,
                required: true,
            },
            price: {
                type: Number,
                required: true,
            },
            description: {
                type: String,
                required: true,
            },
            category: {
                type: String,
                required: true,
            },
            brand: {
                type: String,
                default: 'any',
            },
            quantity: {
                type: Number,
                default: 1,
            }
        }
    ],
    numberOfProducts: {
        type: Number,
        default: 0
    },
    subTotal: {
        type: Number,
        default: 0
    },
    shippingCost: {
        type: Number,
        default: 0
    },
    vat: {
        type: Number,
        default: 0
    },
    total: {
        type: Number,
        default: 0
    }
}, { timestamps: { createdAt: true, updatedAt: true } });

module.exports = mongoose.model('Cart', cartSchema); 