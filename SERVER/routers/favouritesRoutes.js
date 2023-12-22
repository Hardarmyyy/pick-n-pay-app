const express = require('express');
const routers = express.Router();
const {addAndRemoveFromFavourites, fetchBuyerFavouritesProducts} = require('../controllers/favouritesController')
const {isAllowedRole} = require('../middleware/checkAllowedRole')
const {buyerRole} = require('../Utilities/allowedRoles')


routers.post('/toggle-favourites/:id', isAllowedRole(buyerRole), addAndRemoveFromFavourites);
routers.get('/all-favourites/:userId', isAllowedRole(buyerRole), fetchBuyerFavouritesProducts);

module.exports = routers; 