const mongoose = require('mongoose');
const Cart = require('./CartModel.js');
const Favourite = require('./FavouritesModel.js');
const Order = require('./OrderModel.js');
const Product = require('./ProductsModel.js');
const ShippingAddress = require('./ShippingAddressModel.js');


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
    token: [
        {type: String}
    ]

}, { timestamps: { createdAt: true, updatedAt: true } });

userSchema.post('findOneAndDelete', async (doc) => {
    // Delete existing cart for the deleted user
    await Cart.findOneAndDelete({buyer: doc._id});
    // Delete existing wishlist items for the deleted user
    await Favourite.deleteMany({buyer: doc._id});
    // Delete order history for the deleted user
    await Order.deleteMany({buyer: doc._id});
    // Delete all products for the deleted user
    await Product.deleteMany({seller: doc._id});
    // Delete all shipping address for the deleted user
    await ShippingAddress.deleteMany({buyer: doc._id});
})

module.exports = mongoose.model('User', userSchema);

