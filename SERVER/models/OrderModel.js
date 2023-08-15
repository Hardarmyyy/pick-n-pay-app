const mongoose = require("mongoose");

// create an order model for the buyer orders

const orderSchema = new mongoose.Schema( 
    {  
    buyerID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Buyer",
        required: true
    },
    orderID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Cart",
        required: true
    },
    orderedItems: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product"
            },
            sellerID: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Seller"
            },
            title: {
                type: String,
                required: true,
            },
            price: {
                type: Number,
                required: true,
            },
            photo: {
                type: String,
            },
            description: {
                type: String,
                required: true,
            },
            category: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Category',
                required: true, 
            },
            special: {
                type: Boolean,
                default: false,
            },
            quantity: {
                type: Number
            }
        }
    ],
    payment: {
        type: Boolean,
        default: true
    },
    Pending: {
        type: Boolean,
        default: true
    },
    shipping: {
        type: Boolean,
        default: false
    },
    completed: {
        type: Boolean,
        default: false
    },
    orderTotal: {
        type: Number,
        default: 0
    }
    },
    { timestamps: {createdAt: true, updatedAt: true} }
);

module.exports = mongoose.model("Order", orderSchema);