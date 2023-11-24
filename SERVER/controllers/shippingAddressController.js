const mongoose = require('mongoose'); 
const User = require('../models/UserModel')
const ShippingAddress = require('../models/ShippingAddressModel')


const addNewShippingAddress = async (req, res) => {
        const {userId} = req.params
        const {firstName, lastName, email, phoneNumber, streetAddress, city, state} = req.body

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

        // create the new shipping address
        const newShippingAddress = {
            firstName: firstName, 
            lastName: lastName, 
            email: email, 
            phoneNumber: phoneNumber, 
            streetAddress: streetAddress, 
            city: city, 
            state: state
        }

        // check if the user(buyer) have an existing shipping address;
        let shippingAddress = await ShippingAddress.findOne({buyerId: userId})

        if (!shippingAddress) {
            shippingAddress = new ShippingAddress ({buyerId: userId, myShippingAddresses: [newShippingAddress]})
            await shippingAddress.save()
            return res.status(201).json({
                success: true, 
                message: 'New shipping address has been created successfully', 
                shippingAddress: shippingAddress
            })
        }

        shippingAddress.myShippingAddresses.push(newShippingAddress)
        await shippingAddress.save()
        return res.status(201).json({
            success: true, 
            message: 'New shipping address has been added to your existing list of addresses successfully', 
            shippingAddress: shippingAddress
        })
    }
    catch (err) {
        res.status(500).json({error: 'Internal server error', message: err.message})
    }
}

const fetchAllShippingAddress = async (req, res) => {
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
        
        // check if the user(buyer) have an existing list of addresses;
        let shippingAddress = await ShippingAddress.findOne({buyerId: userId})

        if (!shippingAddress) { // create a new shippingAddress for the user(buyer)

            const newShippingAddress = new ShippingAddress ({buyerId: userId, myShippingAddresses: []})
            await newShippingAddress.save()

            return res.status(404).json({ 
                error: true, 
                message: "The user does't have any existing address in the shipping address yet!",
                shippingAddress: newShippingAddress
            })
        }

        else if (shippingAddress.myShippingAddresses.length == 0) return res.status(201).json({ 
            success: true, 
            message: "The user shipping address list is empty!",
            shippingAddress: shippingAddress
        })

        return res.status(201).json({
            success: true, 
            message: 'The user list of addresses has been fetched successfully', 
            shippingAddress: shippingAddress
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
        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({ 
            error: true, 
            message: "The shipping address ID is invalid!"
        })

        const user = await User.findOne({username: username})

        if (!user) return res.status(404).json({ 
            error: true, 
            message: "User doesn't exist!" 
        })
    
        let shippingAddress = await ShippingAddress.findOne({buyerId: user._id})
        if (!shippingAddress) return res.status(404).json({ 
            error: true, 
            message: "The user does not have any existing shipping address yet!" 
        })
        
        // check  if the shipping address is existing in the user(buyer) list of shipping addresses
        const existingShippingAddress = shippingAddress.myShippingAddresses.find((address) => address._id.equals(id))
        if (!existingShippingAddress) return res.status(404).json({ 
            error: true, 
            message: "The address does not exist in the list of the user shipping addresses!",
        })

        await ShippingAddress.findOneAndUpdate({buyerId: user._id}, {$pull: {myShippingAddresses: {_id: id} }} )

        return res.status(201).json({
            success: true, 
            message: 'Address has been deleted successfully', 
            deletedShippingAddress: existingShippingAddress
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
        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({ 
            error: true, 
            message: "The shipping address ID is invalid!"
        })

        const user = await User.findOne({username: username})
        if (!user) return res.status(404).json({
            error: true, 
            message: 'The user does not exist'
        })
    
        let shippingAddress = await ShippingAddress.findOne({buyerId: user._id})
        if (!shippingAddress) return res.status(404).json({ 
            error: true, 
            message: "The user does not have any existing shipping address yet!"
        })

        // check  if the shipping address is existing in the user(buyer) list of shipping addresses
        let existingShippingAddress = shippingAddress.myShippingAddresses.find((address) => address._id.equals(id))
        if (!existingShippingAddress) return res.status(404).json({ 
            error: true, 
            message: "The address does not exist in the list of the user shipping addresses!" 
        })

        // update ths existing shipping address with the req body
        existingShippingAddress.firstName = firstName,
        existingShippingAddress.lastName = lastName,
        existingShippingAddress.email = email,
        existingShippingAddress.phoneNumber = phoneNumber,
        existingShippingAddress.streetAddress = streetAddress,
        existingShippingAddress.city = city,
        existingShippingAddress.state = state

        await shippingAddress.save();

        return res.status(201).json({
            success: true, 
            message: 'Address has been updated successfully', 
            updatedShippingAddress: existingShippingAddress
        })

    }
    catch (err) {
        res.status(500).json({error: 'Internal server error', message: err.message})
    }
}

module.exports = {
    addNewShippingAddress,
    fetchAllShippingAddress,
    deleteShippingAddress,
    updateShippingAddress
}