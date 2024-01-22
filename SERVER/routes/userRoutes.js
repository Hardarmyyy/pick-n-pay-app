const express = require('express');
const { getAllUsers, allSellers, allBuyers, getSingleUser, deleteUser, updatePassword, updateUser, switchUserRole} = require('../controllers/userController');
const {isAllowedRole} = require('../middleware/checkAllowedRole')
const {adminRole, buyerRole, sellerRole} = require('../Utilities/allowedRoles')
const routes = express.Router();


routes.get('/all-users/:id', isAllowedRole(adminRole), getAllUsers);
routes.get('/all-sellers/:id', isAllowedRole(adminRole), allSellers);
routes.get('/all-buyers/:id', isAllowedRole(adminRole), allBuyers);
routes.get('/user/:id', isAllowedRole(adminRole, buyerRole, sellerRole), getSingleUser)
routes.delete('/delete/:id', isAllowedRole(buyerRole, sellerRole), deleteUser)
routes.patch('/password/:id', isAllowedRole(adminRole, buyerRole, sellerRole), updatePassword)
routes.patch('/edit-profile/:id', isAllowedRole(buyerRole, sellerRole), updateUser)
routes.patch('/switch-role/:id', isAllowedRole(buyerRole, sellerRole), switchUserRole) 


module.exports = routes;      