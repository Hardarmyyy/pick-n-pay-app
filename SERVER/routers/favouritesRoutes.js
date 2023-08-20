const express = require('express');
const routers = express.Router();
const {addItemToFavourites, removeItemFromFavourites, getAllFavourites} = require('../controllers/Favourites')

// favourites routes
routers.post('/add/:username/:productid', addItemToFavourites);
routers.delete('/delete/:username/:productid', removeItemFromFavourites);
routers.get('/:username', getAllFavourites);

module.exports = routers; 