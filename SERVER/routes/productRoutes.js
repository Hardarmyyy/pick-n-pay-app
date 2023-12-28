const express = require('express');
const routes = express.Router();
const {addProduct, singleProduct, updateProduct, deleteProduct, sellerStoreProducts} = require('../controllers/productController')
const {isAllowedRole} = require('../middleware/checkAllowedRole')
const {sellerRole} = require('../Utilities/allowedRoles')



routes.post('/add-product/:userId', isAllowedRole(sellerRole), addProduct)
routes.get('/product/:id', isAllowedRole(sellerRole), singleProduct)
routes.patch('/update-product/:id', isAllowedRole(sellerRole), updateProduct)
routes.delete('/delete-product/:id', isAllowedRole(sellerRole), deleteProduct)
routes.get('/store-all-products/:userId', isAllowedRole(sellerRole), sellerStoreProducts)


module.exports = routes;    