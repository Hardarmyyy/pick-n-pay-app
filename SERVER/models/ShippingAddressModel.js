const mongoose = require("mongoose");


const shippingSchema = new mongoose.Schema({  
    buyerId: {
        type: String,
        required: true
    },
    myShippingAddresses: [
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
            streetAddress: {
                type: String
            },
            city: {
                type: String
            },
            state: {
                type: String
            }
        }
    ]
    }, { timestamps: {createdAt: true, updatedAt: true} });

module.exports = mongoose.model("ShippingAddress", shippingSchema);