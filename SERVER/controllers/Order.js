const mongoose = require('mongoose'); // require mongoose to validate _id for buyers;
const Buyer = require('../models/BuyerModel');
const Order = require('../models/OrderModel')
const Cart = require('../models/CartModel');


// create a complete order controller for the buyer
exports.completeOrder = async (req, res, next) => {
    try {
        // check and validate if the request _id for the product is a mongoDB id and if product exist;
        const { username } = req.params
        const {shippingAddress} = req.body
            const buyer = await Buyer.findOne({username: username})
        if (!buyer) {
            return res.status(400).json({ error: "buyer doesn't exist!" })
        }
        else {// check and validate if the user has an existing items in the cart and order;

            let cart = await Cart.findOne({buyerID: buyer._id })

            if (cart.myCart.length === 0) {
                return res.status(400).json({ error: "cart is empty. Add products to cart to complete order!" })
            }
            else {
                const allCartItems = await Promise.all(cart.myCart.map( async(product) => {
                    return {productId: product.productId, seller: product.seller, title: product.title, price: product.price, photo: product.photo[0], description: product.description, category: product.category, special: product.special, quantity: product.quantity}
                }))
                    // create a new order;
                    const latestOrder = {orderID: cart._id, orderedItems: [...allCartItems], shippingAddress: {...req.body}, payment: true, pending: true, shipping: false, completed: false, orderTotal: cart.total}

                    let order = await Order.findOne({buyerID: buyer._id}) 

                if (order) { // if the buyer has made order before or have previously completed orders
                        order.myOrders.push(latestOrder)
                        await order.save()
                        const deletedCart = await Cart.findByIdAndDelete({_id: cart._id})
                        return res.status(200).json({updatedOrder: order})
                }
                else {
                    const newOrder = new Order({buyerID: buyer._id, myOrders: [latestOrder]})
                    await newOrder.save()
                    const deletedCart = await Cart.findByIdAndDelete({_id: cart._id})
                    return res.status(201).json({newOrder: newOrder})
                }
            }
        }
    } 
    catch (error) {    
        res.status(500).send({ error: error.message });
    }
};

// create a get all order controller for the buyer
exports.allOrders = async (req, res, next) => {
    try {
        // check and validate if the request _id for the product is a mongoDB id and if product exist;
        const { username } = req.params

            const buyer = await Buyer.findOne({username: username})
        if (!buyer) {
            return res.status(400).json({ error: "buyer doesn't exist!" })
        }
        else {// check and validate if the user has an existing items in the cart and order;
                let order = await Order.findOne({buyerID: buyer._id})

                if (!order) {
                    return res.status(400).json({ error: "The buyer doesn't have any existing order!" })
                }
                else if(order) {
                    
                    const allOrders = await Promise.all(order.myOrders.map( async(orderRequests) => {
                        
                        return {orderID: orderRequests.orderID, orderedItems: [...orderRequests.orderedItems], shippingAddress: orderRequests.shippingAddress, payment: orderRequests.payment, pending: orderRequests.pending, shipping: orderRequests.shipping, completed: orderRequests.completed, orderTotal: orderRequests.orderTotal}
                        
                    }))

                    return res.status(201).json({myOrders: order.myOrders})
                }
    }
    }
    catch (error) {    
        res.status(500).send({ error: error.message });
    }
}