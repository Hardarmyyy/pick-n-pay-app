const mongoose = require('mongoose');

// create a product schema  

const productSchema = new mongoose.Schema({ 
    sellerId: {
        type: String,
        required: true,
        index: false,
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

}, { timestamps: { createdAt: true, updatedAt: true } });

module.exports = mongoose.model('Product', productSchema);