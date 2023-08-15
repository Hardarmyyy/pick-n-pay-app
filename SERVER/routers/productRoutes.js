const express = require('express');
const {createProduct, allProducts, findAProduct, deleteProduct, updateProduct, allProductFromAllSellers} = require('../controllers/Products')
const routers = express.Router();

//product routes
routers.post('/create/:username', createProduct)
routers.get('/all/:username', allProducts)
routers.get('/:username/:productid', findAProduct)
routers.patch('/update/:username/:productid', updateProduct)
routers.delete('/delete/:username/:productid', deleteProduct)
routers.get('/all', allProductFromAllSellers)

module.exports = routers;  