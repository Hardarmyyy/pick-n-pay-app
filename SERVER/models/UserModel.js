const mongoose = require('mongoose');

// create a User schema for users

const userSchema = new mongoose.Schema({
    roles: {
        buyer: {
            type: String
        },
        seller: {
            type: String
        },
        admin: {
            type: String
        }
    },
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: true
    },
    verified : {
        type: Boolean,
        default: false
    },
    cart: [
        { type: mongoose.Schema.Types.ObjectId, ref: 'Cart' }
    ],
    favourites: [
        { type: mongoose.Schema.Types.ObjectId, ref: 'Favourites' }
    ],
    myOrders: [
        { type: mongoose.Schema.Types.ObjectId, ref: 'Orders' }
    ],
    store: [
        { type: mongoose.Schema.Types.ObjectId, ref: 'Store' }
    ],
    token: [
        {type: String}
    ]

}, { timestamps: { createdAt: true, updatedAt: true } });

module.exports = mongoose.model('User', userSchema);