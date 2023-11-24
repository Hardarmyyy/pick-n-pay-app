const express = require('express');
const routers = express.Router();
const {addAndDeleteFavourites, fetchAllFavouritesProducts} = require('../controllers/favouritesController')
const {isAllowedRole} = require('../middleware/checkAllowedRole')
const {buyerRole} = require('../Utilities/allowedRoles')


routers.post('/add-favourites/:id', isAllowedRole(buyerRole), addAndDeleteFavourites);
routers.get('/all-favourites-products/:userId', isAllowedRole(buyerRole), fetchAllFavouritesProducts);

module.exports = routers; 