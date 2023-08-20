const mongoose = require('mongoose'); // require mongoose to validate _id for buyers;
const Buyer = require('../models/BuyerModel');
const Seller = require('../models/SellerModel')
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
        // check and validate if the buyer exist;
            const {username} = req.params
            const buyer = await Buyer.findOne({username: username})
            const seller = await Seller.findOne({username: username})
        if (!buyer && !seller) {
            return res.status(400).json({ error: "Kindly signup or login to add items to wishlist"})
        }
        else if (seller) {
            return res.status(400).json({ error: "Sorry! Your user profile can't add items to wishlist"}) 
        }
        else if (buyer) {
            const {price, quantity} = req.body
            const newProduct = { productId: product._id, seller: product.sellerName, title: product.title, price: price, photo: product.photo[0].filename, description: product.description, category: product.category, special: product.special, quantity: quantity};
            // check and validate if the user has an existing favourites;
                let favourites = await Favourites.findOne({buyerID: buyer._id })
            if (favourites) { // if there is an existing favourites for the current buyer)
                    const existingItem = favourites.myFavourites.find((item) => item.productId === productid)
                        if (existingItem) {
                            return res.status(400).json({ error: "product is existing in your wishlist already" })
                        }
                        else {
                            favourites.myFavourites.push(newProduct)
                            await favourites.save()
                            return res.status(201).json({favourites})
                        }
            }
            else { // if the buyer does not have a favourites; then create a new favourites for the buyer;
                favourites = new Favourites({ buyerID: buyer._id, myFavourites: [newProduct] })
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
        // check and validate if the buyer exist;
            const {username} = req.params
            const buyer = await Buyer.findOne({username: username})
        if (!buyer) {
            return res.status(400).json({ error: "Sorry! Your user profile can't add items to cart"})
        }
        else {// check if there is an existing favourites for the current buyer)
                let favourites = await Favourites.findOne({buyerID: buyer._id })
            if (favourites) { 
                    const existingItem = favourites.myFavourites.find((item) => item.productId === productid)
                    if (existingItem) {

                        await Favourites.findOneAndUpdate({_id: favourites._id}, {$pull: {myFavourites: {productId: productid}}})
                        return res.status(201).json({removedItem: existingItem})
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
            const {username} = req.params
            const buyer = await Buyer.findOne({username: username})
        if (!buyer) {
            return res.status(400).json({ error: "buyer doesn't exist!" })
        }
        else {
            let favourites = await Favourites.findOne({buyerID: buyer._id})
            if (!favourites) {
                return res.status(404).json({ error: "The buyer doesn't have any product in the favourites!" })
            }
            else {
                if (favourites && favourites.myFavourites.length > 0) {
                    return res.status(201).json({favourites})
                }
                else if (favourites && favourites.myFavourites.length == 0){
                    const emptyFavourites = await Favourites.findByIdAndUpdate({_id: favourites._id},  {$set: {myFavourites: []}})
                    return res.status(201).json({emptyFavourites})
                }
            }
        }
    } 
    catch (error) {
        res.status(500).send({ error: error.message });
    }
}