const express = require('express');
const routers = express.Router();
const {addProduct, singleProduct, updateProduct, deleteProduct, sellerStoreProducts} = require('../controllers/productController')
const {isAllowedRole} = require('../middleware/checkAllowedRole')
const {sellerRole} = require('../Utilities/allowedRoles')



routers.post('/add-product/:userId', isAllowedRole(sellerRole), addProduct)
routers.get('/product/:id', isAllowedRole(sellerRole), singleProduct)
routers.patch('/update-product/:id', isAllowedRole(sellerRole), updateProduct)
routers.delete('/delete-product/:id', isAllowedRole(sellerRole), deleteProduct)
routers.get('/store-all-products/:userId', isAllowedRole(sellerRole), sellerStoreProducts)


module.exports = routers;    