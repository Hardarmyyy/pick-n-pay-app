const mongoose = require("mongoose");

// create a favourites schema for the buyer

const favouritesSchema = new mongoose.Schema(
    {
    buyerID: {
        type: String
    }, 
    myFavourites: [
        {
            productId: {
                type: String
            },
            seller: {
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
            photo: [
                {type: String},
            ],
            description: {
                type: String,
                required: true,
            },
            category: {
                type: String
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