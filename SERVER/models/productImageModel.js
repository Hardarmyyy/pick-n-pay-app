const mongoose = require('mongoose');

// create a image schema for the product

const imageSchema = new mongoose.Schema(
    {
    filename: {
        type: String
    }
    },
    { timestamps: { createdAt: true, updatedAt: true }});

module.exports = mongoose.model('Image', imageSchema);