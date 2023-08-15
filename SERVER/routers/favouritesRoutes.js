const express = require('express');
const routers = express.Router();
const {addItemToFavourites, removeItemFromFavourites, getAllFavourites} = require('../controllers/Favourites')

// favourites routes
routers.post('/add/:id/:productid', addItemToFavourites);
routers.delete('/delete/:id/:productid', removeItemFromFavourites);
routers.get('/:id', getAllFavourites);

module.exports = routers; 