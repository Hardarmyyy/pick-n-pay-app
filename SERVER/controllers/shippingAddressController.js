const mongoose = require('mongoose'); 
const User = require('../models/UserModel')
const ShippingAddress = require('../models/ShippingAddressModel')


const createShippingAddress = async (req, res) => {
        const {userId} = req.params
        const {firstName, lastName, email, phoneNumber, streetAddress, city, state} = req.body

    try {
        if (!mongoose.Types.ObjectId.isValid(userId)) return res.sendStatus(400)
    
        const user = await User.findById({_id: userId})
        if (!user) return res.status(404).json({error: "User doesn't exist!"})

        // create the new shipping address
        const newShippingAddress = {
            fullName: `${firstName} ${lastName}`, 
            email: email, 
            phoneNumber: phoneNumber, 
            streetAddress: streetAddress, 
            city: city, 
            state: state
        }

        const shippingAddress = new ShippingAddress ({buyer: userId, ...newShippingAddress})
        await shippingAddress.save()
        return res.status(201).json({
            success: 'Shipping address created successfully', 
            newShippingAddress: shippingAddress
        })
    }
    catch (err) {
        res.status(500).json({error: 'Internal server error', message: err.message})
    }
}

const buyerListOfAddresses = async (req, res) => {
        const {userId} = req.params

    try {
        if (!mongoose.Types.ObjectId.isValid(userId)) return res.sendStatus(400)
    
        const existingUser = await User.findById({_id: userId})
        if (!existingUser) return res.status(404).json({error: "User doesn't exist!"})

        const listOfAddresses = await ShippingAddress.aggregate([
            {
                $match: {
                    'buyer': existingUser._id
                }
            },
            {
                $project: {
                    fullName: "$fullName",
                    email: "$email",
                    phoneNumber: "$phoneNumber",
                    streetAddress: "$streetAddress",
                    city: "$city",
                    state: "$state",
                    createdAt: "$createdAt"
                }
            },
            {
                $sort: {
                    createdAt: -1
                }
            },
            {
                $limit: 3
            }
        ])

        if (!listOfAddresses.length) return res.status(200).json({ 
            success: "The user does't have any existing address yet!",
            shippingAddress: listOfAddresses
        })
        
        return res.status(200).json({
            success: 'The user list of addresses has been fetched successfully', 
            shippingAddress: listOfAddresses
        })
    }
    catch (err) {
        res.status(500).json({error: 'Internal server error', message: err.message})
    }
}

const deleteShippingAddress = async (req, res) => {
        const {id} = req.params
        const {username} = req.query

    try {
        if (!mongoose.Types.ObjectId.isValid(id)) return res.sendStatus(400)

        const shippingAddress = await ShippingAddress.findById({_id: id})
        if (!shippingAddress) return res.status(404).json({error: "Address not found!"})

        const existingUser = await User.findOne({username: username})
        if (!existingUser) return res.status(404).json({error: "User doesn't exist!"})
    
        const buyerAddresses = await ShippingAddress.aggregate([
            {
                $match: {
                    "buyer": existingUser._id
                }
            },
            {
                $project: {
                    _id: 0,
                    addressId: "$_id"
                }
            }
        ])

        let existingBuyerAddress = buyerAddresses.find((address) => address.addressId.equals(id))

        if (!existingBuyerAddress) return res.status(404).json({error: "Address not found in the user's list of addresses!"})

        const deletedShippingAddress = await ShippingAddress.findOneAndDelete({_id: id})

        return res.status(200).json({
            success: 'Address has been deleted successfully', 
            deletedShippingAddress: deletedShippingAddress,
            addressId: id
        })
    }
    catch (err) {
        res.status(500).json({error: 'Internal server error', message: err.message})
    }
}

const updateShippingAddress = async (req, res) => {
        const {id} = req.params
        const {username} = req.query
        const {firstName, lastName, email, phoneNumber, streetAddress, city, state} = req.body

    try {
        if (!mongoose.Types.ObjectId.isValid(id)) return res.sendStatus(400)

        let shippingAddress = await ShippingAddress.findById({_id: id})
        if (!shippingAddress) return res.status(404).json({error: "Address not found!"})

        const existingUser = await User.findOne({username: username})
        if (!existingUser) return res.status(404).json({error: "User doesn't exist!"})
    
        const buyerAddresses = await ShippingAddress.aggregate([
            {
                $match: {
                    "buyer": existingUser._id
                }
            },
            {
                $project: {
                    _id: 0,
                    addressId: "$_id"
                }
            }
        ])

        let existingBuyerAddress = buyerAddresses.find((address) => address.addressId.equals(id))

        if (!existingBuyerAddress) return res.status(404).json({error: "Address not found in the user's list of addresses!"})

        // update ths existing shipping address with the req body
        shippingAddress.fullName = `${firstName} ${lastName}`, 
        shippingAddress.email = email,
        shippingAddress.phoneNumber = phoneNumber,
        shippingAddress.streetAddress = streetAddress,
        shippingAddress.city = city,
        shippingAddress.state = state

        await shippingAddress.save();

        return res.status(200).json({
            success: 'Address has been updated successfully', 
            updatedShippingAddress: shippingAddress
        })

    }
    catch (err) {
        res.status(500).json({error: 'Internal server error', message: err.message})
    }
}


module.exports = {
    createShippingAddress,
    buyerListOfAddresses,
    deleteShippingAddress,
    updateShippingAddress,
}