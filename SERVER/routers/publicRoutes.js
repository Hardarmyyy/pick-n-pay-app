const express = require('express');
const routers = express.Router();
const {allCategories} = require('../controllers/categoryController')
const {allProducts} = require('../controllers/productController')


// public routes

routers.get('/all-categories', allCategories) 
routers.get('/all-products', allProducts)

module.exports = routers;  