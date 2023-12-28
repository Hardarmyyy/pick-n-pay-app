const express = require('express');
const routes = express.Router();
const {createOrder, getOrdersForBuyers, getOrdersForSellers, getAllOrdersForAdmin, getSingleOrderForAdmin, updateOrderStatusForAdmin} = require('../controllers/orderController')
const {isAllowedRole} = require('../middleware/checkAllowedRole')
const {adminRole, buyerRole, sellerRole} = require('../Utilities/allowedRoles')


routes.post('/create-order', isAllowedRole(buyerRole), createOrder);
routes.get('/orders-buyer', isAllowedRole(buyerRole), getOrdersForBuyers);
routes.get('/orders-seller/:userId', isAllowedRole(sellerRole), getOrdersForSellers);
routes.get('/all-orders', isAllowedRole(adminRole), getAllOrdersForAdmin);
routes.get('/order/:orderId', isAllowedRole(adminRole), getSingleOrderForAdmin);
routes.patch('/update-order/:orderId', isAllowedRole(adminRole), updateOrderStatusForAdmin);

module.exports = routes;    