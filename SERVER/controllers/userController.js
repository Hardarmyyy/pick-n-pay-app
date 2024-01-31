const mongoose = require('mongoose')
const {format} = require('date-fns')
const bcrypt = require('bcrypt')
const User = require('../models/UserModel')
const {createAccessToken} = require('../Utilities/signJWT')




const getAllUsers = async (req, res) => { 
        const {id} = req.params
        
    try {

        if (!mongoose.Types.ObjectId.isValid(id)) return res.sendStatus(400)

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

        if (!mongoose.Types.ObjectId.isValid(id)) return res.sendStatus(400)

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

    if (!mongoose.Types.ObjectId.isValid(id)) return res.sendStatus(400)

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
        if (!mongoose.Types.ObjectId.isValid(id)) return res.sendStatus(400)

        const user = await User.findById({_id: id})
        if (!user) return res.status(404).json({error: "User not found!"})

        const createdTime = format(user.createdAt, 'yyyy-MM-dd hh:mm:ss a')
        const updatedTime = format(user.updatedAt, 'yyyy-MM-dd hh:mm:ss a')
        const currentRole = Object.values(user.roles).filter(Boolean)

        const singleUserFormatedDate = { 
            userId: user._id,
            roles: currentRole,
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
        if (!mongoose.Types.ObjectId.isValid(id)) return res.sendStatus(400)

        const existingUser = await User.findById({_id: id})
        if (!existingUser) return res.json({error: 'User not found'});

        const deletedUser = await User.findByIdAndDelete({_id: id})
            return res.status(200).json({
                message: 'User profile deleted successfully',
                deletedUser: deletedUser
        })
	} 
    catch (err) {
        res.status(500).json({error: 'Internal server error', message: err.message})
    }
}

const updatePassword = async (req, res) => {
            const {id} = req.params
            const {currentPassword, newPassword, confirmPassword} = req.body

    try {
        if (!mongoose.Types.ObjectId.isValid(id)) return res.sendStatus(400)

        const existingUser = await User.findById({_id: id})
        if (!existingUser) return res.json({error: 'User not found'});

        if (!currentPassword || !newPassword || !confirmPassword) return res.status(400).json({
            error: true, 
            message: "All fields are required!" 
        })
        
        // Check if the provided current password matches the user's password
        const isPasswordMatch = await bcrypt.compare(currentPassword, existingUser.password);

        if (!isPasswordMatch) return res.status(400).json({error: 'Incorrect current password'});

        // check if the new password matches the confirm new password
        if (newPassword !== confirmPassword) return res.status(400).json({error: 'New password does not match'});
        
        // Hash the user new password
        const salt = await bcrypt.genSalt(Number(process.env.SALT));
        const newHashedPassword = await bcrypt.hash(newPassword, salt);

        // update and save the user password
        existingUser.password = newHashedPassword
        await existingUser.save()

        res.status(200).json({
            message: `Password has been updated successfully`,
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

        if (!mongoose.Types.ObjectId.isValid(id)) return res.sendStatus(400)

        if (!username || !email) return res.status(400).json({error: "All fields are required!"})

        const existingUser = await User.findById({_id: id})
        if (!existingUser) return res.status(404).json({error: 'User not found'});
        
        // check for username duplicate
        const registeredUsername = await User.findOne({ username: username });

        if (registeredUsername && registeredUsername?._id.toString() !== existingUser._id.toString()) return res.status(409).json({error: "Username is taken. Choose another one."})
        
        // check for email duplicate
        const registeredEmail = await User.findOne({ email: email });

        if (registeredEmail && registeredEmail?._id.toString() !== existingUser._id.toString()) return res.status(409).json({error: "Email address is taken. Choose another one."})

        // if all the condition are passed; update the user information;
        existingUser.username = username,
        existingUser.email = email
        await existingUser.save()

        const token = createAccessToken(existingUser)

        res.status(200).json({
            message: `Profile has been updated successfully`,
            token: token 
        })
    }
    catch (err) {
        res.status(500).json({error: 'Internal server error', message: err.message})
    }
}

const switchUserRole = async (req, res) => {
        const {id} = req.params

    try {

        if (!mongoose.Types.ObjectId.isValid(id)) return res.sendStatus(400)

        const existingUser = await User.findById({_id: id})
        if (!existingUser) return res.status(404).json({error: 'User not found'});

        // find the current user role
        const currentUserRole = Object.values(existingUser.roles).filter(Boolean)

        // check if the currentUser role is not thesame as the new role
        const buyerRole = currentUserRole.find((role) => role === 'buyer')
        const sellerRole = currentUserRole.find((role) => role === 'seller')

        if (buyerRole) {
            existingUser.roles = {buyer: null, seller:'seller', admin: null}
            await existingUser.save()

            const token = createAccessToken(existingUser)

            return res.status(201).json({
                message: `Your profile has been switched successfully`,
                token: token
            })
        }
        else if (sellerRole) {
            existingUser.roles = { buyer: 'buyer', seller: null, admin: null}
            await existingUser.save()

            const token = createAccessToken(existingUser)

            return res.status(201).json({
                message: `Your profile has been switched successfully`,
                token: token
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
    switchUserRole
}



