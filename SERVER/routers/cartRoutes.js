const express = require('express');
const routers = express.Router();
const {addItemToCart, allCartItems, addQuantity, decrementQuantity, deleteItem, emptyCart} = require('../controllers/Cart')

// cart routes
routers.post('/add/:username/:productid', addItemToCart);
routers.patch('/increment/:username/:productid', addQuantity);
routers.patch('/decrement/:username/:productid', decrementQuantity);
routers.get('/all/:username', allCartItems);
routers.delete('/delete/:username/:productid', deleteItem);
routers.delete('/empty/:username', emptyCart);


module.exports = routers;  