const express = require('express');
const {test, getAllUsers, allSellers, allBuyers, getSingleUser, deleteUser, updatePassword, updateUser, switchToSellerRole, switchToBuyerRole} = require('../controllers/userController');
const {isAllowedRole} = require('../middleware/checkAllowedRole')
const {adminRole} = require('../Utilities/allowedRoles')
const routers = express.Router();

routers.get('/', test)
routers.get('/all-users/:id', isAllowedRole(adminRole), getAllUsers);
routers.get('/all-sellers/:id', isAllowedRole(adminRole), allSellers);
routers.get('/all-buyers/:id', isAllowedRole(adminRole), allBuyers);
routers.get('/user/:id', getSingleUser)
routers.delete('/delete/:id', deleteUser)
routers.patch('/password/:id', updatePassword)
routers.patch('/edit-profile/:id', updateUser)
routers.patch('/switch-seller/:id', switchToSellerRole) 
routers.patch('/switch-buyer/:id', switchToBuyerRole)

module.exports = routers;      