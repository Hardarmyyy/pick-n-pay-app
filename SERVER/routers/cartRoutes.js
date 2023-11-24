const express = require('express');
const routers = express.Router();
const {
    addProductToCart,
    fetchCartProducts,
    addQuantity,
    decrementQuantity,
    deleteProductFromCart,
    emptyCartProducts
} = require('../controllers/cartController')
const {isAllowedRole} = require('../middleware/checkAllowedRole')
const {buyerRole} = require('../Utilities/allowedRoles')


routers.post('/add-cart/:id', addProductToCart);
routers.patch('/increment-cart/:id', addQuantity);
routers.patch('/decrement-cart/:id', decrementQuantity);
routers.get('/all-cart-products', fetchCartProducts);
routers.delete('/delete-cart/:id', deleteProductFromCart);
routers.delete('/empty-cart', emptyCartProducts);


module.exports = routers;   