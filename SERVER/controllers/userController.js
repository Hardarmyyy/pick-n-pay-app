const mongoose = require('mongoose')
const {format} = require('date-fns')
const bcrypt = require('bcrypt')
const User = require('../models/UserModel')
const Cart = require('../models/CartModel')
const Store = require('../models/StoreModel')
const Favourites = require('../models/FavouritesModel')
const Product = require('../models/ProductsModel')


//get all users
const getAllUsers = async (req, res) => {
        const {id} = req.params
        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(403)
    try {
        const allUsers = await User.find({}).sort({createdAt: -1}).lean()
        const allusersFormatedDate = await Promise.all(allUsers.map( async (u) => {
            const createdTime = format(u.createdAt, 'yyyy-MM-dd hh:mm:ss a') // formatting the created datetime
            const updatedTime = format(u.updatedAt, 'yyyy-MM-dd hh:mm:ss a') // formatting the updated datetime
            return {...u, createdAt: createdTime, updatedAt: updatedTime}
        }))

        if (!allusersFormatedDate.length) return res.json({
            error: true, 
            message: 'The user list is empty', 
            user: allusersFormatedDate
        })

        res.status(200).json({ 
            success: true, 
            message: 'Total users fetched successfully', 
            user: allusersFormatedDate
        })
    }
    catch (err) {
        res.status(500).json({error: err.message}) 
    }
}

//get a user
const getSingleUser = async (req, res) => {
        const {id} = req.params

    try {
        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(403).json({
            error: true, 
            message: "The user ID is invalid!" 
        })

        const user = await User.findById({_id: id})
        if (!user) return res.json({
            error: true, 
            message: 'User not found'
        });

        const createdTime = format(user.createdAt, 'yyyy-MM-dd hh:mm:ss a') // formatting the created datetime
        const updatedTime = format(user.updatedAt, 'yyyy-MM-dd hh:mm:ss a') // formatting the updated datetime

        const singleUserFormatedDate = {
            _id: user._id, 
            username: user.username, 
            email: user.email, 
            userRole: user.roles,
            verified: user.verified, 
            cart: user.cart,
            favourites: user.favourites, 
            myOrders: user.myOrders, 
            store: user.store, 
            customerOrders: user.customerOrders,
            createdAt: createdTime, 
            updatedAt: updatedTime
        }

        res.status(200).json({
            success: true, 
            message: 'single user retrieved successfully', 
            user: singleUserFormatedDate
        });

    }
    catch (err) {
        res.status(500).json({error: err.message});
    }
}

//delete a user
const deleteUser = async (req, res) => {
        const {id} = req.params

	try {
        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(403).json({
            error: true, 
            message: "The user ID is invalid!" 
        })

        const user = await User.findById({_id: id})
        if (!user) return res.json({
            error: true, 
            message: 'User not found'
        });

        // check if the user has an existing products in the cart, favorites or store
        const existingCart = await Cart.findOne({buyerId: user._id})
        const existingFavourites = await Favourites.findOne({buyerId: user._id})
        const existingStore = await Store.findOne({sellerId: user._id})
            
        if (!existingCart || !existingFavourites || !existingStore) {
            const deletedUser = await User.findByIdAndDelete({_id: id})
            return res.status(200).json({
                success: 'true', 
                message: 'User has been deleted successfully', 
                deletedUser: deletedUser
            })
        }
        
        else if (existingCart || existingFavourites) {

            // empty the cart and return the products back to the shelf
            await Promise.all(existingCart.myCart.map( async(product) => {
                // update the product new stockQty by adding the quantity back to the stockQty in the store
                let store = await Store.findOne({sellerId: product.sellerId})
                const storeItem = store.myStore.find((item) => item._id.equals(product.productId))
                storeItem.countInStock += product.quantity 

                // update the product stockQty by adding it back to the product qty
                const allProduct = await Product.find({})
                await Promise.all(allProduct.map( async(pro) => {
                    if (pro._id.equals(product.productId)) {
                        await Product.findByIdAndUpdate({_id: product.productId}, {countInStock: pro.countInStock + product.quantity})
                    }
                })) 
                    
                await store.save()

                return {productId: product.productId, seller: product.sellerName, title: product.title, price: product.price, quantity: product.quantity}
            }))
            
            // delete the cart
            await Cart.findByIdAndDelete({_id: existingCart._id})
            // delete the favourites
            await Favourites.findOneAndDelete({buyerId: user._id})

            const deletedUser = await User.findByIdAndDelete({_id: id})
            return res.status(200).json({
                success: 'true', 
                message: 'User has been deleted successfully', 
                deletedUser: deletedUser
            })
        }
    
        else if (existingStore) { // if the user(seller) has an exisiting store with products;
            // delete the products from the user(seller) store
            const storeItems = await Promise.all(existingStore.myStore.map(  async(item) => {
                const deleteExisitngProduct = await Product.findByIdAndDelete({_id: item._id})
                return {deletedShopItems: deleteExisitngProduct}
            }))

            // delete the shop
            const deletedShop = await Store.findOneAndDelete({sellerId: user._id})

            const deletedUser = await User.findByIdAndDelete({_id: id})
            return res.status(200).json({
                success: 'true', 
                message: 'User has been deleted successfully', 
                deletedStoreProducts: storeItems, 
                removedShop: deletedShop, 
                deletedUser: deletedUser
            })
        }   
	} 
    catch (error) {
        res.status(500).send({error: error.message});
    }
}

//update a user password
const updatePassword = async (req, res) => {
            const {id} = req.params
            const {currentPassword, newPassword, confirmPassword} = req.body
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(403).json({
            error: true, 
            message: "The user ID is invalid!" 
        })

        const existingUser = await User.findById({_id: id})
        if (!existingUser) return res.json({
            error: true, 
            message: 'User not found'
        });

        if (!currentPassword || !newPassword || !confirmPassword) return res.status(404).json({
            error: true, 
            message: "All fields are required!" 
        })
        
        // Check if the provided current password matches the user's password
        const isPasswordMatch = await bcrypt.compare(currentPassword, existingUser.password);

        if (!isPasswordMatch) return res.status(401).json({
            error: true, 
            message: 'Incorrect current password' 
        });

        // check if the new password matches the confirm new password
        if (newPassword !== confirmPassword) {
            return res.status(401).json({
                error: true, 
                message:  'Password does not match'
            });
        }
        
        // Hash the user new password
        const salt = await bcrypt.genSalt(Number(process.env.SALT));
        const newHashedPassword = await bcrypt.hash(newPassword, salt);

        // update and save the user password
        existingUser.password = newHashedPassword
        await existingUser.save()

        res.status(200).json({
            success: true, 
            message: `${existingUser.username}, your password has been updated successfully`,
            updatedUser: existingUser
        })
	} 
    catch (error) {
        res.status(500).send({error: error.message});
    }
} 

//update a user info
const updateUser = async (req, res) => {
        const {id} = req.params
        const {username, email } = req.body;
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(403).json({
            error: true, 
            message: "The user ID is invalid!" 
        })

        if (!username || !email) return res.status(400).json({ 
            error: true, 
            message: "All fields are required!"
        })

        const existingUser = await User.findById({_id: id})
        if (!existingUser) return res.json({
            error: true, 
            message: 'User not found'
        });
        
        // check for username duplicate
        const registeredUsername = await User.findOne({ username: username });

        if (registeredUsername && registeredUsername?._id.toString() !== existingUser._id.toString()) return res.status(409).json({
            error: true, 
            message: "Username is taken. Choose another one."
        })
        
        // check for email duplicate
        const registeredEmail = await User.findOne({ email: email });

        if (registeredEmail && registeredEmail?._id.toString() !== existingUser._id.toString()) return res.status(409).json({ 
            error: true, 
            message: "Email is already in use. Choose another one."
        })

        // if all the condition are passed; update the user information;
        existingUser.username = username,
        existingUser.email = email

        await existingUser.save()
        res.status(201).json({
            success: true,
            message: `${existingUser.username}. Your profile has been updated successfully`,
            updatedUser: existingUser
        })
    }
    catch (error) {
        res.status(500).send({error: error.message});
    }
}

// switch userRole to seller
const switchToSellerRole = async (req, res) => {
        const {id} = req.params
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(403).json({
            error: true, 
            message: "The user ID is invalid!" 
        })

        const existingUser = await User.findById({_id: id})
        if (!existingUser) return res.json({
            error: true, 
            message: 'User not found'
        });

        // find the current user role
        const currentUserRole = Object.values(existingUser.roles).filter(Boolean)

        // check if the currentUser role is not thesame as the new role
        const allowNewRole = currentUserRole.find((role) => role !== 'seller')

        if (allowNewRole) {
            existingUser.roles = {
                buyer: null,
                seller:'seller',
                admin: null
            }

            await existingUser.save()
            res.status(201).json({
                success: true,
                message: `${existingUser.username}. Your profile has been switched to ${existingUser.roles.seller} successfully`,
                updatedUser: existingUser
            })
        }
        

    }
    catch (error) {
        res.status(500).send({error: error.message});
    }
}

// switch userRole to buyer
const switchToBuyerRole = async (req, res) => {
    const {id} = req.params
try {
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(403).json({
        error: true, 
        message: "The user ID is invalid!" 
    })

    const existingUser = await User.findById({_id: id})
    if (!existingUser) return res.json({
        error: true, 
        message: 'User not found'
    });

    // find the current user role
    const currentUserRole = Object.values(existingUser.roles).filter(Boolean)

    // check if the currentUser role is not thesame as the new role
    const allowNewRole = currentUserRole.find((role) => role !== 'buyer')

    if (allowNewRole) {
        existingUser.roles = {
            buyer: 'buyer',
            seller: null,
            admin: null
        }

        await existingUser.save()
        res.status(201).json({
            success: true,
            message: `${existingUser.username}. Your profile has been switched to ${existingUser.roles.buyer} successfully`,
            updatedUser: existingUser
        })
    }
    

}
catch (error) {
    res.status(500).send({error: error.message});
}
}


module.exports = {
    getAllUsers,
    getSingleUser,
    deleteUser,
    updatePassword,
    updateUser,
    switchToSellerRole,
    switchToBuyerRole
}



