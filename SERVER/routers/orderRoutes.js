const express = require('express');
const routers = express.Router();
const {completeOrder, allOrders} = require('../controllers/Order')

// order routes
routers.post('/complete/:id', completeOrder);
routers.get('/all/:id', allOrders);



module.exports = routers;   