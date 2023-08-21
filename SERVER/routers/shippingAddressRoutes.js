const express = require('express');
const { addShippingAddress, deleteShippingAddress, findShippingAddress} = require('../controllers/Shipping');
const routers = express.Router();

// shipping address routes

routers.post('/create/:username', addShippingAddress);
routers.get('/all/:username', findShippingAddress);
routers.delete('/delete/:username/:id', deleteShippingAddress)


module.exports = routers;     