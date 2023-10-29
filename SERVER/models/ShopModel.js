const mongoose = require("mongoose");

const shopSchema = new mongoose.Schema(
    {
    sellerId: {
        type: String,
    },
    myShop: [
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
            photo: [
                {
                filename: {type: String},
                _id: {type: String}
                }
            ],
            description: {
                type: String,
                required: true,
            },
            category: {
                type: String,
                required: true,
            },
            special: {
                type: Boolean,
                default: false,
            },
            like: {
                type: Boolean,
                default: false
            },
            stockQty: {
                type: Number,
                default: 1
            }
        }
    ]
},
{ timestamps: {createdAt: true, updatedAt: true} }
);

module.exports = mongoose.model("Shop", shopSchema);