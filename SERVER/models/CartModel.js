const mongoose = require('mongoose');

// define a cart model for the buyer
const cartSchema = mongoose.Schema(
    {
    buyerId: {
        type: String
    },
    myCart: [
        {
        productId: {
            type: String
        },
        seller: {
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
        photo: [
            {type: String}
        ],
        description: {
            type: String,
            required: true,
        },
        category: {
            type: String
        },
        special: {
            type: Boolean,
            default: false,
        },
        quantity: {
            type: Number,
            default: 1,
        }
    }
    ],
    subTotal: {
        type: Number,
        default: 0
    },
    shipping: {
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
    }
,{ timestamps: { createdAt: true, updatedAt: true }});

module.exports = mongoose.model('Cart', cartSchema); 