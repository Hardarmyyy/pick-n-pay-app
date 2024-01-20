const express = require('express');
const { getAllUsers, allSellers, allBuyers, getSingleUser, deleteUser, updatePassword, updateUser, switchUserRole} = require('../controllers/userController');
const {isAllowedRole} = require('../middleware/checkAllowedRole')
const {adminRole} = require('../Utilities/allowedRoles')
const routes = express.Router();


routes.get('/all-users/:id', isAllowedRole(adminRole), getAllUsers);
routes.get('/all-sellers/:id', isAllowedRole(adminRole), allSellers);
routes.get('/all-buyers/:id', isAllowedRole(adminRole), allBuyers);
routes.get('/user/:id', getSingleUser)
routes.delete('/delete/:id', deleteUser)
routes.patch('/password/:id', updatePassword)
routes.patch('/edit-profile/:id', updateUser)
routes.patch('/switch-role/:id', switchUserRole) 


module.exports = routes;      