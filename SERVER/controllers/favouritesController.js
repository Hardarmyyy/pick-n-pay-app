const mongoose = require('mongoose');
const User = require('../models/UserModel');
const Favourites = require('../models/FavouritesModel');
const Product = require('../models/ProductsModel');



const addAndRemoveFromFavourites = async (req, res) => {
        const { id } = req.params
        const {username} = req.query

    try {
        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({ 
            error: true, 
            message: "The product ID is invalid!"
        })

        const exisitingProduct = await Product.findById({_id: id})
        if (!exisitingProduct) return res.status(404).json({ 
            error: true, 
            message: "product does not exist" 
        })
        
        const existingUser = await User.findOne({username: username})
        if (!existingUser) return res.status(404).json({ 
            error: true, 
            message: "The user does not exist!"
        })

        const newFavouriteProduct = { 
            product: exisitingProduct._id, 
            seller: exisitingProduct.seller,
            title: exisitingProduct.title, 
            price: exisitingProduct.price, 
            description: exisitingProduct.description, 
            category: exisitingProduct.category, 
            brand: exisitingProduct.brand, 
            quantity: 1
        };

        let buyersFavouritesItem = await Favourites.aggregate([
            {
                $match: {
                    "buyer": existingUser._id
                }
            },
            {
                $project: {
                    _id: 0,
                    productId: "$product",
                    sellerId: "$seller",
                    title: "$title",
                    price: "$price",
                    decsription: "$description",
                    category: "$category",
                    brand: "$brand",
                    quantity: "$quantity"
                }
            },
            {
                $sort: {
                    createdAt: -1
                }
            }
        ])

        const existingFavouritesItem = buyersFavouritesItem.find((fav) => fav.productId.equals(id))

        if (existingFavouritesItem) {
            const deletedItem = await Favourites.findOneAndDelete({product: id}) 
                
            return res.status(201).json({
                    success: true, 
                    message: 'Product has been removed from the user favourites sucessfully', 
                    deletedFavouritesItem: deletedItem
            })
        }

        const newFavouritesItem = new Favourites({ buyer: existingUser._id, ...newFavouriteProduct })
        await newFavouritesItem.save()

        return res.status(201).json({
            success: true, 
            message: 'Product has been added to the user favourites list successfully',
            newFavouritesItem: newFavouritesItem
        })
        
    } 
    catch (err) {    
        res.status(500).json({error: 'Internal server error', message: err.message})
    }
};

const fetchBuyerFavouritesProducts =  async(req, res) => {
        const {userId} = req.params

    try {
        if (!mongoose.Types.ObjectId.isValid(userId)) return res.status(404).json({ 
            error: true, 
            message: "The user ID is invalid!"
        })
    
        const existingUser = await User.findById({_id: userId})
        if (!existingUser) return res.status(404).json({ 
            error: true, 
            message: "User doesn't exist!" 
        })
        
        let buyersFavouritesItem = await Favourites.aggregate([
            {
                $match: {
                    "buyer": existingUser._id
                }
            },
            {
                $project: {
                    _id: 0,
                    productId: "$product",
                    sellerId: "$seller",
                    title: "$title",
                    price: "$price",
                    decsription: "$description",
                    category: "$category",
                    brand: "$brand",
                    quantity: "$quantity"
                }
            },
            {
                $sort: {
                    createdAt: -1
                }
            }
        ])

        if (!buyersFavouritesItem.length) return res.status(404).json({ 
            error: true, 
            message: "The buyer doesn't have any product in the favourites list!",
            emptyWishlist: buyersFavouritesItem
        })
        
        return res.status(201).json({ 
            success: true, 
            message: "Wishlist products has been fetched successfully!",
            wishListItems: buyersFavouritesItem,
            numberOfFavouritesItems: buyersFavouritesItem.length
        })
    } 
    catch (err) {
        res.status(500).json({error: 'Internal server error', message: err.message})
    }
};

module.exports = {
    addAndRemoveFromFavourites,
    fetchBuyerFavouritesProducts
}  

