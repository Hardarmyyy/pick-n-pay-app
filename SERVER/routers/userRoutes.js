const express = require('express');
const { login, signup, allUser, getUser, deleteUser, updateUserPassword, updateUser} = require('../controllers/User');
const routers = express.Router();

// user routes
routers.post('/login', login);
routers.post('/signup', signup);
routers.get('/all', allUser);
routers.get('/:username', getUser)
routers.delete('/:username', deleteUser)
routers.patch('/password/change/:username', updateUserPassword)
routers.patch('/update/:currentusername', updateUser)

module.exports = routers;     