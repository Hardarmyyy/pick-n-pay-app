const mongoose = require("mongoose");

// create a favourites schema for the user (buyer)

const favouritesSchema = new mongoose.Schema({
    buyerId: {
        type: String
    },  
    myFavourites: [
        {
            productId: {
                type: String
            },
            sellerId: {
                type: String
            },
            title: {
                type: String,
                required: true,
            },
            price: {
                type: Number,
                required: true,
            },
            description: {
                type: String,
                required: true,
            },
            category: {
                type: String,
                required: true,
            },
            brand: {
                type: String,
                default: 'any',
            },
            quantity: {
                type: Number,
                default: 1,
            }
        }
    ]
}, { timestamps: {createdAt: true, updatedAt: true} });

module.exports = mongoose.model("Favourites", favouritesSchema);