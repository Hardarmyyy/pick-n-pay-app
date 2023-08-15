const mongoose = require('mongoose'); // require mongoose to validate _id for buyers;
const Buyer = require('../models/BuyerModel');
const Favourites = require('../models/FavouritesModel')
const Product = require('../models/ProductsModel');


// create a add item to favourites controller for the buyer
exports.addItemToFavourites = async (req, res, next) => {
    try {
        // check and validate if the request _id for the product is a mongoDB id and if product exist;
        const { productid } = req.params
        if (!mongoose.Types.ObjectId.isValid(productid)) {
            return res.status(404).json({ error: "The product ID is invalid!" })
        }
            const product = await Product.findById({_id: productid}) 
        if (!product) {
            return res.status(400).send({ error: "product does not exist" })
        }
        // check and validate if the request _id is a mongoDB id and if buyer exist;
            const {id} = req.params
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ error: "The user ID is invalid!" })
        }
            const buyer = await Buyer.findById({_id: id})
        if (!buyer) {
            return res.status(400).json({ error: "buyer doesn't exist!" })
        }
        else {
            const { quantity} = req.body
            const newProduct = { productId: product._id, sellerID: product.sellerID, title: product.title, price: product.price, photo: product.photo, description: product.description, category: product.category, special: product.special, quantity: quantity};
            // check and validate if the user has an existing favourites;
                let favourites = await Favourites.findOne({buyerID: id })
            if (favourites) { // if there is an existing favourites for the current buyer)
                    const existingItem = favourites.myFavourites.find((item) => item.productId.equals(productid))
                        if (existingItem) {
                            return res.status(400).json({ error: "product is existing in the favourites already" })
                        }
                        else {
                            favourites.myFavourites.push(newProduct)
                            await favourites.save()
                            return res.status(201).json({favourites})
                        }
            }
            else { // if the buyer does not have a favourites; then create a new favourites for the buyer;
                favourites = new Favourites({ buyerID: id, myFavourites: [newProduct] })
                await favourites.save()
                return res.status(201).json({favourites});
            }
        }
    } 
    catch (error) {    
        res.status(500).send({ error: error.message });
    }
};

// create a remove item from favourites controller for the buyer
exports.removeItemFromFavourites = async (req, res, next) => {
    try {
        // check and validate if the request _id for the product is a mongoDB id and if product exist;
        const { productid } = req.params
        if (!mongoose.Types.ObjectId.isValid(productid)) {
            return res.status(404).json({ error: "The product ID is invalid!" })
        }
            const product = await Product.findById({_id: productid}) 
        if (!product) {
            return res.status(400).send({ error: "product does not exist" })
        }
        // check and validate if the request _id is a mongoDB id and if buyer exist;
            const {id} = req.params
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ error: "The user ID is invalid!" })
        }
            const buyer = await Buyer.findById({_id: id})
        if (!buyer) {
            return res.status(400).json({ error: "buyer doesn't exist!" })
        }
        else {// check if there is an existing favourites for the current buyer)
                let favourites = await Favourites.findOne({buyerID: id })
            if (favourites) { 
                    const existingItem = favourites.myFavourites.find((item) => item.productId.equals(productid))
                    if (existingItem) {
                        await Favourites.findOneAndUpdate({_id: favourites._id}, {$pull: {myFavourites: {productId: productid}}})
                        // update the favourites before saving 
                            return res.status(201).json({removedItem: existingItem})
                        }
                    else if (!existingItem) {
                        return res.status(401).json({ error: "Sorry! The product is not in your favorites"})
                    }
            }
        }
    } 
    catch (error) {    
        res.status(500).send({ error: error.message });
    }
};

// define a route for buyer to get all products from favourites; NOTE: pass the buyer_id as the first params
exports.getAllFavourites =  async(req, res, next) => {
    try {
        // check and validate if the request _id is a mongoDB id and if buyer exist;
            const {id} = req.params
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ error: "The user ID is invalid!" })
        }
            const buyer = await Buyer.findById({_id: id})
        if (!buyer) {
            return res.status(400).json({ error: "buyer doesn't exist!" })
        }
        else {
            let favourites = await Favourites.findOne({buyerID: id})
            if (!favourites) {
                return res.status(404).json({ error: "The buyer doesn't have any product in the favourites!" })
            }
            else {
                if (favourites && favourites.myFavourites.length > 0) {
                    return res.status(201).json({favourites})
                }
                else if (favourites && favourites.myFavourites.length == 0){
                    const deletedFavourites = await Favourites.findByIdAndDelete({_id: favourites.id})
                    return res.status(201).json({deletedFavourites})
                }
            }
        }
    } 
    catch (error) {
        res.status(500).send({ error: error.message });
    }
}