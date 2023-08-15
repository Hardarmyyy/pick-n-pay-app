const mongoose = require('mongoose');

// create a buyer schema for the buyer

const buyerSchema = new mongoose.Schema({
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
    cart: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Cart' }],
    favourites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Favourites' }],
    orders: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Orders' }]

},{ timestamps: { createdAt: true, updatedAt: true }});

module.exports = mongoose.model('Buyer', buyerSchema);