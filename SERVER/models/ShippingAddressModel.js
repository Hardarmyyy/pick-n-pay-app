const mongoose = require("mongoose");

// create an shipping address model for the buyer orders

const shippingSchema = new mongoose.Schema( 
    {  
    buyerID: {
        type: String
    },
    myShippingAddress: [{
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
    }]
    },
    { timestamps: {createdAt: true, updatedAt: true} }
);

module.exports = mongoose.model("Shipping", shippingSchema);