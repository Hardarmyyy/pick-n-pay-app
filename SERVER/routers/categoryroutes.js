const express = require('express');
const routers = express.Router();
const {createCategory, allCategory, deleteCategory} = require('../controllers/Category')

// category routes
routers.post('/post', createCategory)
routers.get('/all', allCategory)
routers.delete('/delete/:id', deleteCategory)


module.exports = routers;  