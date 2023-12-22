const mongoose = require('mongoose'); 
const User = require('../models/UserModel');
const ShippingAddress = require('../models/ShippingAddressModel');
const Order = require('../models/OrderModel');
const Cart = require('../models/CartModel');
const Product = require('../models/ProductsModel');
const {format} = require('date-fns');


const createOrder = async (req, res) => {
        const {username} = req.query
        const {shippingAddressId, paymentMethod} = req.body

    try {
        // check and validate if the user exist
        const existingUser = await User.findOne({username: username})
        if (!existingUser) return res.status(404).json({
            error: true,
            message: 'user does not exist'
        })

        // find the shipping Address
        const shippingAddress = await ShippingAddress.aggregate([
            {
                $match: {
                    "buyer": existingUser._id
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
            }
        ])

        const existingShippingAddress =  shippingAddress.find((sa) => sa._id.equals(shippingAddressId))
        if (!existingShippingAddress) return res.status(404).json({
            error: true,
            message: 'Shipping address does not exist'
        })

        // find the cart products
        let cart = await Cart.findOne({buyer: existingUser._id })
        if (!cart || cart.myCart.length == 0) return res.status(404).json({
            error: true,
            message: 'Kindly add products to cart to continue'
        })
    
        const allCartItems = await Promise.all(cart.myCart.map( async(product) => {
            const seller = await User.findById({_id: product.seller})
            return { product: product.product, sellerName: seller.username, ...product}
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

        const newOrder = new Order({ buyer: existingUser._id, ...newOrderInformation })

        // update the products by decrementing the quantity order for each item from the countInStock
        await Promise.all(cart.myCart.map( async(product) => {
            let item = await Product.findOne({seller: product.seller})

            await Product.findByIdAndUpdate({_id: product.product}, {countInStock: item.countInStock - product.quantity})
            return;
        }))

        await newOrder.save() // save the ned order
        
        // update the cart by emptying all products
        const emptiedCart = await Cart.findByIdAndUpdate({_id: cart._id}, {$set: {myCart: [], numberOfProducts: 0, subTotal: 0, shippingCost: 0, vat: 0, total: 0}})

        return res.status(201).json({
            success: true, 
            message: 'New order has been created for user and cart is emptied',
            newOrder: newOrder
        })
    } 
    catch (err) {    
        res.status(500).json({error: 'Internal server error', message: err.message})
    }
}

const getOrdersForBuyers = async (req, res) => {
        const { username } = req.query

    try {
        // check and validate if the user exist
        const existingUser = await User.findOne({username: username})
        if (!existingUser) return res.status(404).json({
            error: true,
            message: 'user does not exist'
        })

        // Use aggregation pipeline to fetch orders;
        let customerOrder = await Order.aggregate([
            {
                $match: {
                    "buyer": existingUser._id
                }
            },
            {
                $lookup: {
                    from: 'shippingaddresses',
                    localField: 'shippingAddress',
                    foreignField: '_id',
                    as: 'shippingAddress'
                }
            },
            {
                $sort: {
                    createdAt: -1
                }
            }
        ])

        if (!customerOrder.length) return res.status(404).json({
            error: true, 
            message:  "Your order history is empty!",
            orderHistory: customerOrder
        })


        const allCustomerOrder = await Promise.all(
            customerOrder.map( async (ord) => {
            const formattedOrderDate = format(ord.createdAt, 'yyyy-MM-dd hh:mm:ss a') 
            return {
                orderId: ord._id,
                orderItems: [...ord.orderItems], 
                orderQuantity: ord.orderQuantity, 
                shippingAddress: ord.shippingAddress, 
                paymentMethod: ord.paymentMethod, 
                isPending: ord.isPending,
                isShipped: ord.isShipped,
                isDelivered: ord.isDelivered,
                subTotal: ord.subTotal,
                shippingCost: ord.shippingCost,
                vat: ord.vat,
                orderTotal: ord.orderTotal, 
                orderDate: formattedOrderDate
            }
        }))

        return res.status(201).json({
            success: true, 
            message:  "Order history fetched successfully!",
            orderHistory: allCustomerOrder
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
        if (!existingUser) {
            return res.status(404).json({
                error: true,
                message: 'User does not exist',
            });
        }

        // Use aggregation pipeline to fetch orders;
        const sellerOrder = await Order.aggregate([
            {
                $match: {
                    'orderItems.sellerName': existingUser.username,
                },
            },
            {
                $sort: {
                    createdAt: -1
                }
            }
        ]);

        if (!sellerOrder.length) return res.status(404).json({
            error: true, 
            message:  "Your order history is empty!",
            orderHistory: sellerOrder
        })

        //Extract only the necessary information from the result
        const orderHistory = await Promise.all( sellerOrder.map(async (order) => {
            const {orderItems} = order
            const sellerOrderItems = orderItems.filter(item => item.sellerName === existingUser.username);
            const formattedOrderDate = format(order.createdAt, 'yyyy-MM-dd hh:mm:ss a') 
            const buyerName = await User.findById({_id: order.buyer})
            const sellerOrderTotal = sellerOrderItems.reduce((prev, item) => prev + (item.price * item.quantity), 0)

            return {
                orderId: order._id,
                buyer: buyerName.username,
                orderItems: sellerOrderItems,
                shippingAddress: order.shippingAddress,
                paymentMethod: order.paymentMethod,
                isPending: order.isPending,
                isShipped: order.isShipped,
                isDelivered: order.isDelivered,
                orderDate: formattedOrderDate,
                orderTotal: sellerOrderTotal.toFixed(2),
            };
        }))

        return res.status(201).json({
            success: true,
            message: 'Order history fetched successfully for seller!',
            orderHistory: orderHistory
        });

    } catch (err) {
        res.status(500).json({
            error: 'Internal server error',
            message: err.message,
        });
    }
};

const getAllOrdersForAdmin = async (req, res) => {
        const { username } = req.query
    try {
        // check and validate if the user exist
        const existingUser = await User.findOne({username: username})
        if (!existingUser) return res.status(404).json({
            error: true,
            message: 'user does not exist'
        })

        let allOrders = await Order.aggregate([
            {
                $project: {
                    buyer: '$buyer',
                    orderItems: '$orderItems',
                    orderQuantity: '$orderQuantity',
                    shippingAddress: '$shippingAddress',
                    paymentMethod: '$paymentMethod',
                    isPending: '$isPending',
                    isShipped: '$isShipped',
                    isDelivered: '$isDelivered',
                    subTotal: '$subTotal',
                    shippingCost: '$shippingCost',
                    vat: '$vat',
                    orderTotal: '$orderTotal',
                    createdAt: '$createdAt',
                }
            },
            {
                $sort: {
                    createdAt: -1
                }
            }
        ])

        if (!allOrders.length) return res.status(404).json({
            error: true, 
            message:  "There are no orders!",
            allOrders: allOrders
        })

        const allOrdersFormatedDate = await Promise.all( 
            allOrders.map( async (ord) => {
                const formattedOrderDate = format(ord.createdAt, 'yyyy-MM-dd hh:mm:ss a') 
                const existingUser = await User.findById({_id: ord.buyer})
                return {
                    orderId: ord._id,
                    ...ord,
                    buyer: existingUser.username,
                    orderDate: formattedOrderDate
                }
        }))

        const allOrdersFormattedDateFlat = allOrdersFormatedDate;
        
        return res.status(201).json({
            success: true, 
            message:  "All order fetched successfully!",
            allOrders: allOrdersFormattedDateFlat
        })
    }
    catch (err) {
        res.status(500).json({error: 'Internal server error', message: err.message})    
    }
}

const getSingleOrderForAdmin = async (req, res) => {
    const {orderId} = req.params
    const {username} = req.query

    try {
        if (!mongoose.Types.ObjectId.isValid(orderId)) return res.status(404).json({ 
            error: true, 
            message: "The order ID is invalid!"
        })

        // check and validate the user;
        const existingUser = await User.findOne({username: username})
        if (!existingUser) return res.status(404).json({ 
            error: true, 
            message: "Sorry! The user does not exist" 
        })

        let singleOrder = await Order.findById({_id: orderId})

        if (!singleOrder) return res.status(404).json({ 
            error: true, 
            message: "The order does not exist"
        }) 

        const formattedOrderDate = format(singleOrder.createdAt, 'yyyy-MM-dd hh:mm:ss a') 
        const buyer = await User.findById({_id: singleOrder.buyer})

        const formattedSingleOrder = {
                    orderId: singleOrder._id,
                    buyerName: buyer.username,
                    orderItems: [...singleOrder.orderItems], 
                    orderQuantity: singleOrder.orderQuantity, 
                    shippingAddress: singleOrder.shippingAddress, 
                    paymentMethod: singleOrder.paymentMethod, 
                    isPending: singleOrder.isPending,
                    isShipped: singleOrder.isShipped,
                    isDelivered: singleOrder.isDelivered,
                    subTotal: singleOrder.subTotal,
                    shippingCost: singleOrder.shippingCost,
                    vat: singleOrder.vat,
                    orderTotal: singleOrder.orderTotal, 
                    orderDate: formattedOrderDate,
                }

        return res.status(201).json({
            success: true, 
            message:  "Single order fetched successfully!",
            singleOrder: formattedSingleOrder
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
    getSingleOrderForAdmin,
    updateOrderStatusForAdmin
}