const mongoose = require('mongoose'); 
const User = require('../models/UserModel');
const ShippingAddress = require('../models/ShippingAddressModel');
const Order = require('../models/OrderModel');
const Cart = require('../models/CartModel');
const {format} = require('date-fns');


const createOrder = async (req, res) => {
        const { userId } = req.params;
        const {shippingAddressId, paymentMethod} = req.body 

    try {
        // check and validate if the user exist
        const existingUser = await User.findById({_id: userId})
        if (!existingUser) return res.status(404).json({ error: 'user does not exist'})

        // find the shipping Address
        const shippingAddress = await ShippingAddress.aggregate([
            {
                $match: {
                    "buyer": existingUser._id
                }
            }
        ])

        const existingShippingAddress =  shippingAddress.find((sa) => sa._id.equals(shippingAddressId))
        if (!existingShippingAddress) return res.status(404).json({ error: 'Shipping address does not exist'})

        // find the cart products
        let cart = await Cart.findOne({buyer: userId })
        if (!cart || cart.myCart.length == 0) return res.status(400).json({ error: 'Kindly add products to cart to continue'})
    
        const allCartItems = await Promise.all(cart.myCart.map( async(product) => {
            const seller = await User.findById({_id: product.seller})
            return { seller: seller.username, ...product}
        })) 

        // create a new orderInformation;
        const newOrderInformation = { 
            orderItems: [...allCartItems],
            orderQuantity: cart.numberOfProducts,
            shippingAddress: existingShippingAddress,
            paymentMethod: paymentMethod,
            subTotal: cart.subTotal,
            shippingCost: cart.shippingCost,
            vat: cart.vat,
            orderTotal: cart.total
        }

        const newOrder = new Order({ buyer: userId, ...newOrderInformation })

        await newOrder.save() // save the new order
        
        // update the cart by emptying all products
        await Cart.findByIdAndUpdate({_id: cart._id}, {$set: {myCart: [], numberOfProducts: 0, subTotal: 0, shippingCost: 0, vat: 0, total: 0}})

        return res.status(201).json({
            success: 'New order has been created successfully',
            newOrder: newOrder
        })
    } 
    catch (err) {    
        res.status(500).json({error: 'Internal server error', message: err.message})
    }
}

const getOrdersForBuyers = async (req, res) => {
        const { userId } = req.params;

    try {
        // check and validate if the user exist
        const existingUser = await User.findById({_id: userId})
        if (!existingUser) return res.status(404).json({ error: 'user does not exist'})

        // Use aggregation pipeline to fetch orders;
        let customerOrder = await Order.aggregate([
            {
                $match: {
                    "buyer": existingUser._id
                }
            },
            {
                $project: {
                    _id: 0,
                    orderId: "$_id",
                    paymentMethod: "$paymentMethod",
                    status: "$isPaid",
                    shippingStatus: "$isShipped",
                    deliveryStatus: "$isDelivered",
                    orderTotal: "$orderTotal",
                    createdAt: "$createdAt",
                }
            },
            {
                $sort: {
                    createdAt: -1
                }
            }
        ])

        if (!customerOrder.length) return res.status(200).json({
            success: "Your order history is empty!",
            orderHistory: customerOrder
        })

        const customerOrderHistory = await Promise.all(
            customerOrder.map( async (ord) => {
            const formattedOrderDate = format(ord.createdAt, 'yyyy-MM-dd hh:mm:ss a') 
            return {...ord, createdAt: formattedOrderDate}
        }))

        return res.status(200).json({
            success: "Order history fetched successfully!",
            orderHistory: customerOrderHistory
        })
    }
    catch (err) {    
        res.status(500).json({error: 'Internal server error', message: err.message})
    }
}

const getOrdersForSellers = async (req, res) => {
    const { userId } = req.params;

    try {
        // Check and validate if the user exists
        const existingUser = await User.findOne({ _id: userId });
        if (!existingUser) return res.status(404).json({ error: 'User does not exist' })

        // Use aggregation pipeline to fetch orders;
        const sellerOrder = await Order.aggregate([
            {
                $match: {
                    'orderItems.seller': existingUser.username,
                },
            },
            {
                $project: {
                    _id: 0,
                    orderId: "$_id",
                    buyer: "$buyer",
                    orderItems: "$orderItems",
                    address: "$shippingAddress",
                    paymentMethod: "$paymentMethod",
                    status: "$isPaid",
                    shippingStatus: "$isShipped",
                    deliveryStatus: "$isDelivered",
                    createdAt: "$createdAt"
                }
            },
            {
                $sort: {
                    createdAt: -1
                }
            }
        ]);

        if (!sellerOrder.length) return res.status(200).json({
            success: "Your order history is empty!",
            orderHistory: sellerOrder
        })

        const sellerOrderHistory = await Promise.all( 
            sellerOrder.map(async (order) => {
            const {orderItems} = order
            const purchasedItems = orderItems.filter(item => item.seller === existingUser.username);
            const formattedOrderDate = format(order.createdAt, 'yyyy-MM-dd hh:mm:ss a') 
            const customer = await User.findById({_id: order.buyer})
            const shipping = await ShippingAddress.findById({_id: order.address})
            const purchasedItemTotal = purchasedItems.reduce((prev, item) => prev + (item.price * item.quantity), 0)

            return { 
                ...order, 
                buyer: customer.username, 
                orderItems: purchasedItems, 
                address:{
                    fullname: shipping.fullName,
                    email: shipping.email,
                    phone: shipping.phoneNumber,
                    street: shipping.streetAddress,
                    city: shipping.city,
                    state: shipping.state
                }, 
                createdAt: formattedOrderDate, 
                orderTotal: purchasedItemTotal.toFixed(2)
            };
        }))

        return res.status(200).json({
            success: 'Order history fetched successfully for seller!',
            orderHistory: sellerOrderHistory
        });

    } catch (err) {
        res.status(500).json({error: 'Internal server error', message: err.message});
    }
};

const getAllOrdersForAdmin = async (req, res) => {
        const { userId } = req.params
    try {
        // check and validate if the user exist
        const existingUser = await User.findById({ _id: userId})
        if (!existingUser) return res.status(404).json({ error: 'user does not exist' })

        const allOrders = await Order.aggregate([
            {
                $project: {
                    _id: 0,
                    orderId: "$_id",
                    buyer: "$buyer",
                    paymentMethod: "$paymentMethod",
                    status: "$isPaid",
                    shippingStatus: "$isShipped",
                    deliveryStatus: "$isDelivered",
                    total: "$orderTotal",
                    createdAt: "$createdAt",
                }
            },
            {
                $sort: {
                    createdAt: -1
                }
            }
        ])

        if (!allOrders.length) return res.status(200).json({
            success: "There are currently no orders to show!",
            allOrders: allOrders
        })

        const allOrdersHistory = await Promise.all( 
            allOrders.map( async (ord) => {
                const formattedOrderDate = format(ord.createdAt, 'yyyy-MM-dd hh:mm:ss a') 
                const customer = await User.findById({_id: ord.buyer})
                return { ...ord, buyer: customer.username, createdAt: formattedOrderDate}
        }))
        
        return res.status(200).json({
            success: "All order fetched successfully!",
            allOrders: allOrdersHistory
        })
    }
    catch (err) {
        res.status(500).json({error: 'Internal server error', message: err.message})    
    }
}

const getSingleOrder = async (req, res) => {
    const {orderId} = req.params

    try {

        let singleOrder = await Order.findById({_id: orderId})

        if (!singleOrder) return res.status(404).json({error: "The order does not exist" }) 

        const shippingAddress = await ShippingAddress.findById({_id: singleOrder.shippingAddress})

        const formattedSingleOrder = {
                    orderItems: [...singleOrder.orderItems], 
                    shipping: {
                        fullname: shippingAddress.fullName, 
                        email: shippingAddress.email, 
                        phoneNumber: shippingAddress.phoneNumber, streetAddress: 
                        shippingAddress.streetAddress, 
                        city: shippingAddress.city, 
                        city: shippingAddress.city, 
                        state: shippingAddress.state
                    }, 
                    paymentMethod: singleOrder.paymentMethod, 
                    isPending: singleOrder.isPaid,
                    isShipped: singleOrder.isShipped,
                    isDelivered: singleOrder.isDelivered,
                    subTotal: singleOrder.subTotal,
                    shippingCost: singleOrder.shippingCost,
                    vat: singleOrder.vat,
                    orderTotal: singleOrder.orderTotal
                }

        return res.status(201).json({
            success: "Single order fetched successfully!",
            fetchOrderById: formattedSingleOrder
        })
    }
    catch (err) {
        res.status(500).json({error: 'Internal server error', message: err.message})    
    }
}

const updateOrderStatusForAdmin = async (req, res) => {

}


module.exports = { 
    createOrder,
    getOrdersForBuyers,
    getOrdersForSellers,
    getAllOrdersForAdmin,
    getSingleOrder,
    updateOrderStatusForAdmin
}