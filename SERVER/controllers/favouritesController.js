const mongoose = require('mongoose');
const User = require('../models/UserModel');
const Favourites = require('../models/FavouritesModel');
const Product = require('../models/ProductsModel');



const addAndDeleteFavourites = async (req, res) => {
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
        
        const user = await User.findOne({username: username})

        if (!user) return res.status(404).json({ 
            error: true, 
            message: "The user does not exist!"
        })

        const newFavouriteProduct = { 
            productId: exisitingProduct._id, 
            sellerId: exisitingProduct.sellerId,
            title: exisitingProduct.title, 
            price: exisitingProduct.price, 
            description: exisitingProduct.description, 
            category: exisitingProduct.category, 
            brand: exisitingProduct.brand, 
            quantity: 1
        };

        // check and validate if the user(buyer) has an existing favourites;
        let favourites = await Favourites.findOne({ buyerId: user._id })

        if (!favourites) { // if the user(buyer) does not have favourites; then create a new favourites for the user(buyer);
            favourites = new Favourites({ buyerId: user._id, myFavourites: [newFavouriteProduct] })
            await favourites.save()
            return res.status(201).json({
                success: true, 
                message: 'New favourites has been created and new product has been added successfully',
                newFavourites: favourites
            });
        }

        const existingFavouritesItem = favourites.myFavourites.find((item) => item.productId === id)

        if (existingFavouritesItem) {

            await Favourites.findOneAndUpdate({_id: favourites._id}, {$pull: {myFavourites: {productId: id} }} )
            return res.status(201).json({
                success: true, 
                message: 'Product has been removed from favourites sucessfully', 
                deletedFavouritesItem: existingFavouritesItem
            })
        }
        
        favourites.myFavourites.push(newFavouriteProduct)
        await favourites.save()
        return res.status(201).json({
            success: true, 
            message: 'New product has been added to existing favoruites successfully', 
            existingFavourites: favourites})
        
    } 
    catch (err) {    
        res.status(500).json({error: 'Internal server error', message: err.message})
    }
};

const fetchAllFavouritesProducts =  async(req, res) => {
        const {userId} = req.params

    try {
        if (!mongoose.Types.ObjectId.isValid(userId)) return res.status(404).json({ 
            error: true, 
            message: "The user ID is invalid!"
        })
    
        const user = await User.findById({_id: userId})
        if (!user) return res.status(404).json({ 
            error: true, 
            message: "User doesn't exist!" 
        })
        
        let favourites = await Favourites.findOne({buyerId: userId})

        if (!favourites) { // create a new favourites for the user (buyer)
            const newFavourites = new Favourites({ buyerId: user._id, myFavourites: [] })
            await newFavourites.save()

            return res.status(404).json({ 
                error: true, 
                message: "The buyer doesn't have an existing favourites list! It's newly created",
                favourites: newFavourites
            })
        }
        else if (favourites.myFavourites.length == 0) return res.status(201).json({ 
            success: true, 
            message: "There favourites list is empty with no products!",
            emptyFavourites: favourites
        })
        
        return res.status(201).json({ 
            success: true, 
            message: "Wishlist products has been fetched successfully!",
            existingFavourites: favourites
        })
    } 
    catch (err) {
        res.status(500).json({error: 'Internal server error', message: err.message})
    }
};

module.exports = {
    addAndDeleteFavourites,
    fetchAllFavouritesProducts
} 

