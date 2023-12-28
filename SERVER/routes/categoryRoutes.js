const express = require('express');
const routes = express.Router();
const {addCategory, updateCategory, deleteCategory} = require('../controllers/categoryController')
const {isAllowedRole} = require('../middleware/checkAllowedRole')
const {adminRole} = require('../Utilities/allowedRoles')

// category routes
routes.post('/add-category/:userId', isAllowedRole(adminRole), addCategory)
routes.patch('/edit-category/:id', isAllowedRole(adminRole), updateCategory)
routes.delete('/delete-category/:id', isAllowedRole(adminRole), deleteCategory) 


module.exports = routes;  