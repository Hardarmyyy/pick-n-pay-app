const mongoose = require('mongoose'); 
const Buyer = require('../models/BuyerModel')
const Shipping = require('../models/ShippingAddressModel')


// create a add shipping address controller for the buyer
exports.addShippingAddress = async (req, res, next) => {
    try {
        // check if the buyer exist;
        const {username} = req.params
        const buyer = await Buyer.findOne({username: username})

        const {firstName, lastName, email, phoneNumber, address, city, state} = req.body

        // create the new shipping address
        const newShipping = {firstName: firstName, lastName: lastName, email: email, phoneNumber: phoneNumber, address: address, city: city, state: state}

        // check if the buyer already has a shipping address;
        let shippingAddress = await Shipping.findOne({buyerID: buyer._id})
        if (shippingAddress) { // if the buyer has an existing shipping, add the new shipping address

            shippingAddress.myShippingAddress.push(newShipping)
            await shippingAddress.save()
            return res.status(201).json({shippingAddress: shippingAddress})
        }
        else { // if the buyer does not have an existing shipping address 

            shippingAddress = new Shipping({buyerID: buyer._id, myShippingAddress: [newShipping]})
            await shippingAddress.save()
            return res.status(201).json({shippingAddress: shippingAddress})
        }

    }
    catch (error) {
        res.status(500).send({ error: error.message });
    }
}

// create a delete shipping address controller for the buyer
exports.deleteShippingAddress = async (req, res, next) => {
    try {
        // check if the buyer exist;
        const {username, id} = req.params
        const buyer = await Buyer.findOne({username: username})

        // check if the buyer already has a shipping address;
        let shippingAddress = await Shipping.findOne({buyerID: buyer._id})

        if (shippingAddress) {
            // check  if the shipping address is existing in the buyer addresses
            const deletedShipping = shippingAddress.myShippingAddress.find((address) => address._id.equals(id))
            // remove the shipping address from the buyer list of addresses
            await Shipping.findOneAndUpdate({buyerID: buyer._id}, {$pull: {myShippingAddress: {_id: id}}})

            return res.status(201).json({deletedShipping: deletedShipping})
        }
        else {

            return res.status(401).json({ error: "The buyer does't have any exising shipping address" })
        }

    }
    catch (error) {
        res.status(500).send({ error: error.message });
    }
}

// create a get shipping address controller for the buyer
exports.findShippingAddress = async (req, res, next) => {
    try {
        // check if the buyer exist;
        const {username} = req.params
        const buyer = await Buyer.findOne({username: username})

        // check if the buyer already has a shipping address;
        let shippingAddress = await Shipping.findOne({buyerID: buyer._id})

        if (shippingAddress) {

            return res.status(201).json({shippingAddress: shippingAddress})
        }
        else {

            return res.status(401).json({ error: "The buyer does't have any exising shipping address" })
        }

    }
    catch (error) {
        res.status(500).send({ error: error.message });
    }
}
