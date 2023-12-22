const express = require('express');
const routers = express.Router();
const {
    createShippingAddress,
    deleteShippingAddress,
    updateShippingAddress,
    buyerListOfAddresses
} = require('../controllers/shippingAddressController');

const {isAllowedRole} = require('../middleware/checkAllowedRole');
const {buyerRole} = require('../Utilities/allowedRoles');



routers.post('/add-shipping-address/:userId', isAllowedRole(buyerRole),  createShippingAddress);
routers.get('/all-shipping-address/:userId', isAllowedRole(buyerRole), buyerListOfAddresses);
routers.delete('/delete-shipping-address/:id', isAllowedRole(buyerRole), deleteShippingAddress)
routers.patch('/edit-shipping-address/:id', isAllowedRole(buyerRole), updateShippingAddress)


module.exports = routers;    