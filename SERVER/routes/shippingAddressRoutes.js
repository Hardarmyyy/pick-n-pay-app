const express = require('express');
const routes = express.Router();
const {
    createShippingAddress,
    deleteShippingAddress,
    updateShippingAddress,
    buyerListOfAddresses
} = require('../controllers/shippingAddressController');

const {isAllowedRole} = require('../middleware/checkAllowedRole');
const {buyerRole} = require('../Utilities/allowedRoles');



routes.post('/add-shipping-address/:userId', isAllowedRole(buyerRole),  createShippingAddress);
routes.get('/all-shipping-address/:userId', isAllowedRole(buyerRole), buyerListOfAddresses);
routes.delete('/delete-shipping-address/:id', isAllowedRole(buyerRole), deleteShippingAddress)
routes.patch('/edit-shipping-address/:id', isAllowedRole(buyerRole), updateShippingAddress)


module.exports = routes;    