const express = require('express');
const routers = express.Router();
const {completeOrder, allOrders} = require('../controllers/Order')

// order routes
routers.post('/complete/:username', completeOrder);
routers.get('/all/:username', allOrders);



module.exports = routers;    