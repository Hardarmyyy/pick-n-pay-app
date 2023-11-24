const mongoose = require("mongoose");


const orderSchema = new mongoose.Schema({ 
        buyer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        orderItems: [
            {
                productId: {
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
            firstName: {
                type: String
            },
            lastName: {
                type: String
            },
            email: {
                type: String
            },
            phoneNumber: {
                type: Number
            },
            streetAddress: {
                type: String
            },
            city: {
                type: String
            },
            state: {
                type: String
            } 
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