const express = require('express');
const routes = express.Router();
const {allCategories} = require('../controllers/categoryController')
const {allProducts, getProductsByCategory} = require('../controllers/productController')


// public routes

routes.get('/all-categories', allCategories) 
routes.get('/all-products', allProducts)
routes.get('/all-products-category', getProductsByCategory)

module.exports = routes;  