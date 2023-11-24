const express = require('express');
const routers = express.Router();
const {createOrder, getOrdersForBuyers, getOrdersForSellers, getAllOrdersForAdmin, getSingleOrderForAdmin, updateOrderStatusForAdmin} = require('../controllers/orderController')
const {isAllowedRole} = require('../middleware/checkAllowedRole')
const {adminRole, buyerRole, sellerRole} = require('../Utilities/allowedRoles')


routers.post('/create-order', isAllowedRole(buyerRole), createOrder);
routers.get('/orders-buyer', isAllowedRole(buyerRole), getOrdersForBuyers);
routers.get('/orders-seller/:userId', isAllowedRole(sellerRole), getOrdersForSellers);
routers.get('/all-orders', isAllowedRole(adminRole), getAllOrdersForAdmin);
routers.get('/order/:orderId', isAllowedRole(adminRole), getSingleOrderForAdmin);
routers.patch('/update-order/:orderId', isAllowedRole(adminRole), updateOrderStatusForAdmin);

module.exports = routers;     