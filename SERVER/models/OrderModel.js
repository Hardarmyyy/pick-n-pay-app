const mongoose = require("mongoose");


const orderSchema = new mongoose.Schema({ 
        buyer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        orderItems: [
            {
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Product',
                    required: true,
                },
                sellerName: {
                    type: String
                },
                title: {
                    type: String,
                },
                price: {
                    type: Number,
                },
                description: {
                    type: String,
                },
                category: {
                    type: String 
                },
                brand: {
                    type: String 
                },
                quantity: {
                    type: Number
                }
            }
        ],
        orderQuantity: {
            type: Number,
            default: 0
        },
        shippingAddress: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'ShippingAddress',
            required: true
        },
        paymentMethod: {
            type: String,
        },
        isPending: {
            type: Boolean,
            default: true
        },
        isShipped: {
            type: Boolean,
            default: false
        },
        isDelivered: {
            type: Boolean,
            default: false
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
            default: 0,
        },
        orderTotal: {
            type: Number,
            default: 0
        }
    }, { timestamps: {createdAt: true, updatedAt: true} });

module.exports = mongoose.model("Order", orderSchema); 