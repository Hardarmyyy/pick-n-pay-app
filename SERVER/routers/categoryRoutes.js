const express = require('express');
const routers = express.Router();
const {addCategory, updateCategory, deleteCategory} = require('../controllers/categoryController')
const {isAllowedRole} = require('../middleware/checkAllowedRole')
const {adminRole} = require('../Utilities/allowedRoles')

// category routes
routers.post('/add-category/:userId', isAllowedRole(adminRole), addCategory)
routers.patch('/edit-category/:id', isAllowedRole(adminRole), updateCategory)
routers.delete('/delete-category/:id', isAllowedRole(adminRole), deleteCategory) 


module.exports = routers;  