const mongoose = require('mongoose');

// create a seller schema for the seller

const sellerSchema = new mongoose.Schema({
    usertype: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    },
    shop: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Shop' }],
    order: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Orders' }]

},{ timestamps: { createdAt: true, updatedAt: true }});

module.exports = mongoose.model('Seller', sellerSchema);