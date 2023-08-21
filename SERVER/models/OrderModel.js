const mongoose = require("mongoose");

// create an order model for the buyer orders

const orderSchema = new mongoose.Schema( 
    {
    buyerID: {
        type: String
    },
    myOrders: [
        { 
        orderID: {
            type: String
        },
        orderedItems: [
            {
                productId: {
                    type: String
                },
                seller: {
                    type: String
                },
                title: {
                    type: String,
                },
                price: {
                    type: Number,
                },
                photo: {
                    type: String,
                },
                description: {
                    type: String,
                },
                category: {
                    type: String 
                },
                quantity: {
                    type: Number
                }
            }
        ],
        shippingAddress:
            {
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
                address: {
                    type: String
                },
                city: {
                    type: String
                },
                state: {
                    type: String
                } 
            },
        payment: {
            type: Boolean,
            default: true
        },
        pending: {
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
            type: Number
        },
        date: {
            type: String,
            default: Date()
        }
        },
    ]  
    },
    { timestamps: {createdAt: true, updatedAt: true} }
);

module.exports = mongoose.model("Order", orderSchema);