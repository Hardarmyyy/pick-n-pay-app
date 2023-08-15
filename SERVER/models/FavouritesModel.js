const mongoose = require("mongoose");

// create a favourites schema for the buyer

const favouritesSchema = new mongoose.Schema(
    {
    buyerID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Buyer",
        required: true,
    },
    myFavourites: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product"
            },
            sellerID: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Seller"
            },
            title: {
                type: String,
                required: true,
            },
            price: {
                type: Number,
                required: true,
            },
            photo: {
                type: String,
            },
            description: {
                type: String,
                required: true,
            },
            category: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Category',
                required: true, 
            },
            special: {
                type: Boolean,
                default: false,
            },
            quantity: {
                type: Number,
                default: 1,
            }
        }
    ]
    },
    { timestamps: {createdAt: true, updatedAt: true} }
);

module.exports = mongoose.model("Favourites", favouritesSchema);