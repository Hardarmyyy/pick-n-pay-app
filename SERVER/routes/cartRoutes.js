const express = require('express');
const routes = express.Router();
const {
    addProductToCart,
    fetchCartProducts,
    addQuantity,
    decrementQuantity,
    deleteProductFromCart,
    emptyCartProducts
} = require('../controllers/cartController');


routes.post('/add-cart/:id', addProductToCart);
routes.patch('/increment-cart/:id', addQuantity);
routes.patch('/decrement-cart/:id', decrementQuantity);
routes.get('/all-cart-products', fetchCartProducts);
routes.delete('/delete-cart/:id', deleteProductFromCart);
routes.delete('/empty-cart', emptyCartProducts);


module.exports = routes;  