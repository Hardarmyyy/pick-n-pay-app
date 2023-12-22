const mongoose = require('mongoose');


const cartSchema = mongoose.Schema({ 
    buyer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    myCart: [
        { 
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
                required: true
            },
            seller: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Seller',
                required: true
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