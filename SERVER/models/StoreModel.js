const mongoose = require("mongoose");

const storeSchema = new mongoose.Schema({
    sellerId: {
        type: String,
        required: true,
    },
    myStore: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
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
            countInStock: {
                type: Number,
                required: true
            }
        }
    ]
}, { timestamps: {createdAt: true, updatedAt: true} });

module.exports = mongoose.model("Store", storeSchema);