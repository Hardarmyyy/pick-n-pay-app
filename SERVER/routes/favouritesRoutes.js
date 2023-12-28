const express = require('express');
const routes = express.Router();
const {addAndRemoveFromFavourites, fetchBuyerFavouritesProducts} = require('../controllers/favouritesController')
const {isAllowedRole} = require('../middleware/checkAllowedRole')
const {buyerRole} = require('../Utilities/allowedRoles')


routes.post('/toggle-favourites/:id', isAllowedRole(buyerRole), addAndRemoveFromFavourites);
routes.get('/all-favourites/:userId', isAllowedRole(buyerRole), fetchBuyerFavouritesProducts);

module.exports = routes; 