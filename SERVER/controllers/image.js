const mongoose = require('mongoose'); // require mongoose to validate _id for buyers;
const Image = require('../models/productImageModel')
const Seller = require('../models/SellerModel')

// create an upload image controller for the seller when creating a new product;
exports.uploadImage =  async (req, res, next) => {
    try {
            const image = new Image({filename: req.file.filename})
            await image.save()
            return res.status(200).json({image})
            
    }
    catch (error){
        res.status(500).send({ error: error.message })
    }
}

// create a get image controller for the seller when creating a new product;
exports.getImage =  async (req, res, next) => {
    try {
            const image = await Image.find({})
            const imagesWithFileName = await Promise.all(image.map((img) => {
                return {filename: img.filename, _id: img._id}
            }))
            return res.status(200).json({imagesWithFileName})
    }
    catch (error){
        res.status(500).send({ error: error.message })
    }
}

// create a delete image controller for the seller when creating a new product;
exports.deleteImage =  async (req, res, next) => {
    try {
            const {id} = req.params
            const image = await Image.findByIdAndDelete({_id: id})
            return res.status(200).json({image})
    }
    catch (error){
        res.status(500).send({ error: error.message })
    }
}

exports.deleteAllImage = async (req, res, next) => {
    try {
        await Image.deleteMany()
        return res.status(200).json({message: 'Images deleted successfully'})
    }
    catch (error){
        res.status(500).send({ error: error.message })
    }
}