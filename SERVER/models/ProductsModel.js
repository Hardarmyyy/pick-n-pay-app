const mongoose = require('mongoose');

// create a product schema  

const productSchema = new mongoose.Schema({ 
    sellerName: {
        type: String,
        required: true
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
    brand: {
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
        required: true
    }

},{ timestamps: { createdAt: true, updatedAt: true }})

module.exports = mongoose.model('Product', productSchema);