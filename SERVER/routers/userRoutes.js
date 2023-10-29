const express = require('express');
const { getAllUsers, getSingleUser, deleteUser, updatePassword, updateUser, switchToSellerRole, switchToBuyerRole} = require('../controllers/userController');
const {isAdmin} = require('../middleware/checkAdmin')
const {adminRole} = require('../Utilities/allowedRoles')
const routers = express.Router();

// user routes
routers.get('/', isAdmin(adminRole), getAllUsers);
routers.get('/:id', getSingleUser)
routers.delete('/delete/:id', deleteUser)
routers.patch('/password/:id', updatePassword)
routers.patch('/edit-profile/:id', updateUser)
routers.patch('/switch-seller/:id', switchToSellerRole)
routers.patch('/switch-buyer/:id', switchToBuyerRole)

module.exports = routers;     