const mongoose = require('mongoose')

const Schema = mongoose.Schema 

const otpSchema = new Schema({
    userId: {
        type: String,
        required: true,
    },
    otp: {
        type: String,
        required: true
    }
}, {timestamps: {createdAt: true, updatedAt: true} });


module.exports = mongoose.model('Otp', otpSchema);  