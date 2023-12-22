const mongoose = require("mongoose");


const shippingSchema = new mongoose.Schema({  
    buyer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    fullName: {
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
    }, { timestamps: {createdAt: true, updatedAt: true} });

module.exports = mongoose.model("ShippingAddress", shippingSchema);