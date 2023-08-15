const mongoose = require('mongoose'); // require mongoose to validate _id for buyers;
const Buyer = require('../models/BuyerModel');
const Order = require('../models/OrderModel')
const Cart = require('../models/CartModel');
const Shop = require('../models/ShopModel');


// create a complete order controller for the buyer
exports.completeOrder = async (req, res, next) => {
    try {
        // check and validate if the request _id for the product is a mongoDB id and if product exist;
        const { id } = req.params
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ error: "The product ID is invalid!" })
        }
            const buyer = await Buyer.findById({_id: id})
        if (!buyer) {
            return res.status(400).json({ error: "buyer doesn't exist!" })
        }
        else {// check and validate if the user has an existing items in the cart and order;

            let cart = await Cart.findOne({buyerID: id })
            if (!cart) {
                return res.status(400).json({ error: "cart is empty. Add products to cart to complete order!" })
            }
            else {
                const allCartItems = await Promise.all(cart.myCart.map( async(product) => {
                    return {productID: product._id, sellerID: product.sellerID, title: product.title, price: product.price, photo: product.photo, description: product.description, category: product.category, special: product.special, quantity: product.quantity}
                }))
                let order = Order.findOne({orderID: cart._id})
    
                if (order) { // if not an existing order
                     // create a new order for the user
                    const latestOrder = new Order({buyerID: id, orderID: cart._id, orderedItems: [...allCartItems], orderTotal: cart.total})
                    await latestOrder.save()
                    const deletedCart = await Cart.findByIdAndDelete({_id: cart.id})
                    return res.status(200).json({newOrder: latestOrder})
                }
                else {
                    return res.status(400).json({ error: "Order does not exist!"})
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
        const { id } = req.params
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ error: "The product ID is invalid!" })
        }
            const buyer = await Buyer.findById({_id: id})
        if (!buyer) {
            return res.status(400).json({ error: "buyer doesn't exist!" })
        }
        else {// check and validate if the user has an existing items in the cart and order;
            let order = Order.findOne({BuyerID: id})
            if (!order) {
                return res.status(400).json({ error: "The buyer doesn't have any existing order!" })
            }
            else {
                const allExistingOrder = await Order.find({})
                const allOrders = await Promise.all(allExistingOrder.map( async(orderRequests) => {
                    if (orderRequests.buyerID.equals(id)) { // find the id that match the current buyer to fetch all orders for the current buyer;
                        return {orderID: orderRequests.orderID, orderedItems: [...orderRequests.orderedItems], payment: orderRequests.payment, Pending: orderRequests.Pending, shipping: orderRequests.shipping, completed: orderRequests.completed, orderTotal: orderRequests.orderTotal}
                    }
                }))

                return res.status(201).json({myOrders: allOrders})
            }
    }
    }
    catch (error) {    
        res.status(500).send({ error: error.message });
    }
}