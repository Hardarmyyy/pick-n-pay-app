const mongoose = require('mongoose')
const {format} = require('date-fns')
const bcrypt = require('bcrypt')
const User = require('../models/UserModel')
const Product = require('../models/ProductsModel')
const ShippingAddress = require('../models/ShippingAddressModel')
const Cart = require('../models/CartModel')
const Favourites = require('../models/FavouritesModel')
const Order = require('../models/OrderModel')



const getAllUsers = async (req, res) => { 
        const {id} = req.params

    try {
        if (!mongoose.Types.ObjectId.isValid(id)) return res.sendStatus(403)

        const allUsers = await User.aggregate([
            {
                $project: {
                    _id: 0,
                    userId: "$_id",
                    userRole: "$roles",
                    username: "$username",
                    email: "$email",
                    createdAt: "$createdAt",
                    updatedAt: "$updatedAt"
                }
            },
            {
                $sort: {
                    createdAt: -1
                }
            }
        ])

        const allusersFormatedDate = await Promise.all(allUsers.map( async (u) => {
            const createdTime = format(u.createdAt, 'yyyy-MM-dd hh:mm:ss a') // formatting the created datetime
            const updatedTime = format(u.updatedAt, 'yyyy-MM-dd hh:mm:ss a') // formatting the updated datetime
            return {...u, createdAt: createdTime, updatedAt: updatedTime}
        }))

        if (!allUsers.length) return res.status(404).json({
            error: 'The user list is empty', 
            allUsers: allUsers
        })

        res.status(200).json({ 
            message: 'All users fetched successfully', 
            allUsers: allusersFormatedDate,
        })
    }
    catch (err) {
        res.status(500).json({error: 'Internal server error', message: err.message}) 
    }
}

const allSellers = async (req, res) => {
        const {id} = req.params

    try {
        if (!mongoose.Types.ObjectId.isValid(id)) return res.sendStatus(403)

        const allSellers = await User.aggregate([
            {
                $unwind: "$roles.seller"
            },
            {
                $sort: {
                    createdAt: -1
                }
            },
            {
                $project: {
                    _id: 0,
                    userId: "$_id",
                    userRole: "$roles",
                    username: "$username",
                    email: "$email",
                    createdAt: "$createdAt",
                    updatedAt: "$updatedAt"
                }
            }
        ])

        const allSellersFormatedDate = await Promise.all(allSellers.map( async (u) => {
            const createdTime = format(u.createdAt, 'yyyy-MM-dd hh:mm:ss a') // formatting the created datetime
            const updatedTime = format(u.updatedAt, 'yyyy-MM-dd hh:mm:ss a') // formatting the updated datetime
            return {...u, createdAt: createdTime, updatedAt: updatedTime}
        }))

        if (!allSellers.length) return res.status(404).json({
            error:'The sellers list is empty', 
            allSellers: allSellers
        })

        res.status(200).json({ 
            message: 'All sellers fetched successfully', 
            allSellers: allSellersFormatedDate,
        })
    }
    catch(err) {
        res.status(500).json({error: 'Internal server error', message: err.message}) 
    }
}

const allBuyers = async (req, res) => {
    const {id} = req.params

try {
    if (!mongoose.Types.ObjectId.isValid(id)) return res.sendStatus(403)

    const allBuyers = await User.aggregate([
        {
            $unwind: "$roles.buyer"
        },
        {
            $sort: {
                createdAt: -1
            }
        },
        {
            $project: {
                _id: 0,
                userId: "$_id",
                userRole: "$roles",
                username: "$username",
                email: "$email",
                createdAt: "$createdAt",
                updatedAt: "$updatedAt"
            }
        }
    ])

    const allBuyersFormatedDate = await Promise.all(allBuyers.map( async (u) => {
        const createdTime = format(u.createdAt, 'yyyy-MM-dd hh:mm:ss a') // formatting the created datetime
        const updatedTime = format(u.updatedAt, 'yyyy-MM-dd hh:mm:ss a') // formatting the updated datetime
        return {...u, createdAt: createdTime, updatedAt: updatedTime}
    }))

    if (!allBuyers.length) return res.json({
        error: 'The buyers list is empty', 
        allBuyers: allBuyers
    })

    res.status(200).json({ 
        message: 'All buyers fetched successfully', 
        allBuyers: allBuyersFormatedDate,
    })
}
catch(err) {
    res.status(500).json({error: 'Internal server error', message: err.message}) 
}
}

const getSingleUser = async (req, res) => {
        const {id} = req.params

    try {
        if (!mongoose.Types.ObjectId.isValid(id)) return res.sendStatus(403)

        const user = await User.findById({_id: id})

        if (!user) return res.status(404).json({error: "User not found!"})

        const createdTime = format(user.createdAt, 'yyyy-MM-dd hh:mm:ss a')
        const updatedTime = format(user.updatedAt, 'yyyy-MM-dd hh:mm:ss a')

        const singleUserFormatedDate = { 
            userId: user._id,
            roles: user.roles,
            username: user.username,
            email: user.email, 
            createdAt: createdTime, 
            updatedAt: updatedTime
        }

        res.status(200).json({
            message: 'single user retrieved successfully', 
            user: singleUserFormatedDate
        });
    }
    catch (err) {
        res.status(500).json({error: 'Internal server error', message: err.message})
    }
}

const deleteUser = async (req, res) => {
        const {id} = req.params

	try {
        if (!mongoose.Types.ObjectId.isValid(id)) return res.sendStatus(403)

        const existingUser = await User.findById({_id: id})
        if (!existingUser) return res.json({error: 'User not found'});

        //check if the user (seller) have existing products
        const existingProducts = await Product.aggregate([
            {
                $match: {
                    'seller': existingUser._id
                }
            }
        ])

        //check if the user (buyer) have existing addresses
        const existingAddresses = await ShippingAddress.aggregate([
            {
                $match: {
                    'buyer': existingUser._id
                }
            }
        ])

        //check if the user (buyer) have existing cart
        const existingCart = await Cart.findOne({buyer: existingUser._id})

        //check if the user (buyer) have existing favoruites
        const existingFavourites = await Favourites.aggregate([
            {
                $match: {
                    'buyer': existingUser._id
                }
            }
        ])

        //check if the user (buyer) have order history
        const existingOrder = await Order.aggregate([
            {
                $match: {
                    'buyer': existingUser._id
                }
            }
        ])

        if (!existingCart && !existingFavourites.length && !existingProducts.length && !existingAddresses.length && !existingOrder.length) {
            const deletedUser = await User.findByIdAndDelete({_id: id})
            return res.status(200).json({
                success: 'true', 
                message: 'User has been deleted successfully',
                deletedUser: deletedUser
            })
        } 

        else if (existingAddresses && (existingCart || existingFavourites) && existingOrder)  { // if the user(buyer) have exisiting addresses, cart, orderhistory, etc;
            // Delete the address and the user concurrently
            const existingUserAddress = await Promise.all(existingAddresses.map(  async(address) => {
                const deleteExisitngAddress = await ShippingAddress.findByIdAndDelete({_id: address._id})
                return {deleteExisitngAddress}
            }))

            // delete the cart
            const deletedCart = await Cart.findByIdAndDelete({_id: existingCart._id})

            // Delete the favourites list and the user concurrently
            const existingUserFavourites = await Promise.all(existingFavourites.map(  async(fav) => {
                const deleteExistingFavourites = await Favourites.findByIdAndDelete({_id: fav._id})
                return {deleteExistingFavourites}
            }))

            // Delete the order list and the user concurrently
            const existingUserOrder = await Promise.all(existingOrder.map(  async(ord) => {
                const deleteExistingOrders = await Order.findByIdAndDelete({_id: ord._id})
                return {deleteExistingOrders}
            }))

            const deletedUser = await User.findByIdAndDelete({_id: id})

            return res.status(200).json({
                message: 'User deleted successfully', 
                deletedUser: deletedUser
            })
        }

        else if (existingProducts) { // if the user(seller) have exisiting products;
            // Delete the products and the user concurrently
            const existingStoreProducts = await Promise.all(existingProducts.map(  async(item) => {
                const deleteExisitngProduct = await Product.findByIdAndDelete({_id: item._id})
                return {deleteExisitngProduct}
            }))

            const deletedUser = await User.findByIdAndDelete({_id: id})

            return res.status(200).json({
                message: 'User deleted successfully', 
                deletedUser: deletedUser
            })
        }
	} 
    catch (err) {
        res.status(500).json({error: 'Internal server error', message: err.message})
    }
}

const updatePassword = async (req, res) => {
            const {id} = req.params
            const {currentPassword, newPassword, confirmPassword} = req.body
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) return res.sendStatus(403)

        const existingUser = await User.findById({_id: id})
        if (!existingUser) return res.json({error: 'User not found'});

        if (!currentPassword || !newPassword || !confirmPassword) return res.status(400).json({
            error: true, 
            message: "All fields are required!" 
        })
        
        // Check if the provided current password matches the user's password
        const isPasswordMatch = await bcrypt.compare(currentPassword, existingUser.password);

        if (!isPasswordMatch) return res.status(401).json({error: 'Incorrect current password'});

        // check if the new password matches the confirm new password
        if (newPassword !== confirmPassword) return res.status(400).json({error: 'Password does not match'});
        
        
        // Hash the user new password
        const salt = await bcrypt.genSalt(Number(process.env.SALT));
        const newHashedPassword = await bcrypt.hash(newPassword, salt);

        // update and save the user password
        existingUser.password = newHashedPassword
        await existingUser.save()

        res.status(200).json({
            message: `Password has been updated successfully`,
            updatedUser: existingUser
        })
	} 
    catch (err) {
        res.status(500).json({error: 'Internal server error', message: err.message})
    }
} 

const updateUser = async (req, res) => {
        const {id} = req.params
        const {username, email } = req.body;
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) return res.sendStatus(403)

        if (!username || !email) return res.status(400).json({error: "All fields are required!"})

        const existingUser = await User.findById({_id: id})
        if (!existingUser) return res.status(404).json({error: 'User not found'});
        
        // check for username duplicate
        const registeredUsername = await User.findOne({ username: username });

        if (registeredUsername && registeredUsername?._id.toString() !== existingUser._id.toString()) return res.status(409).json({error: "Username is taken. Choose another one."})
        
        // check for email duplicate
        const registeredEmail = await User.findOne({ email: email });

        if (registeredEmail && registeredEmail?._id.toString() !== existingUser._id.toString()) return res.status(409).json({error: "Email is already in use. Choose another one."})

        // if all the condition are passed; update the user information;
        existingUser.username = username,
        existingUser.email = email
        await existingUser.save()

        res.status(200).json({
            message: `Profile has been updated successfully`,
            updatedUser: existingUser
        })
    }
    catch (err) {
        res.status(500).json({error: 'Internal server error', message: err.message})
    }
}

const switchToSellerRole = async (req, res) => {
        const {id} = req.params

    try {
        if (!mongoose.Types.ObjectId.isValid(id)) return res.sendStatus(403)

        const existingUser = await User.findById({_id: id})
        if (!existingUser) return res.status(404).json({error: 'User not found'});

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
                message: `Your profile has been switched to ${existingUser.roles.seller} profile successfully`,
                updatedUser: existingUser
            })
        }
    }
    catch (err) {
        res.status(500).json({error: 'Internal server error', message: err.message})
    }
}

const switchToBuyerRole = async (req, res) => {
        const {id} = req.params
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) return res.sendStatus(403)

        const existingUser = await User.findById({_id: id})
        if (!existingUser) return res.status(404).json({error: 'User not found'});

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
                message: `Your profile has been switched to ${existingUser.roles.buyer} profile successfully`,
                updatedUser: existingUser
            })
        }
    }
    catch (err) {
        res.status(500).json({error: 'Internal server error', message: err.message})
    }
}


module.exports = {
    getAllUsers,
    allSellers,
    allBuyers,
    getSingleUser,
    deleteUser,
    updatePassword,
    updateUser,
    switchToSellerRole,
    switchToBuyerRole
}



