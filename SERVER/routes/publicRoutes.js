const express = require('express');
const routes = express.Router();
const {allCategories} = require('../controllers/categoryController')
const {allProducts} = require('../controllers/productController')


// public routes

routes.get('/all-categories', allCategories) 
routes.get('/all-products', allProducts)

module.exports = routes;  