const express = require('express');
const routes = express.Router();
const {createOrder, getOrdersForBuyers, getOrdersForSellers, getAllOrdersForAdmin, getSingleOrder, updateOrderStatusForAdmin} = require('../controllers/orderController')
const {isAllowedRole} = require('../middleware/checkAllowedRole')
const {adminRole, buyerRole, sellerRole} = require('../Utilities/allowedRoles')


routes.post('/create-order/:userId', isAllowedRole(buyerRole), createOrder);
routes.get('/orders-buyer/:userId', isAllowedRole(buyerRole), getOrdersForBuyers);
routes.get('/orders-seller/:userId', isAllowedRole(sellerRole), getOrdersForSellers);
routes.get('/all-orders/:userId', isAllowedRole(adminRole), getAllOrdersForAdmin);
routes.get('/order/:orderId', isAllowedRole(adminRole, buyerRole), getSingleOrder);
routes.patch('/update-order/:orderId', isAllowedRole(adminRole), updateOrderStatusForAdmin);

module.exports = routes;    