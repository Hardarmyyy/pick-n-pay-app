const JWT = require('jsonwebtoken');
require('dotenv').config();

const createVerifyEmailToken = (user) => {
    const {_id, email } = user
    
    const payload = {
        userId: _id,
        email
    }

    const verifyEmailToken = JWT.sign(payload, process.env.VERIFY_EMAIL_TOKEN_SECRET, {expiresIn: process.env.EXPIRY_KEY_EMAIL});
    return verifyEmailToken
}

const createAccessToken = (user) => {
    const {_id, username, email, roles, cart, favourites, myOrders, store } = user

    const currentRole = Object.values(roles).filter(Boolean) // getting the value of roles from the user object

    const payload = {
        userId: _id,
        username,
        email,
        userRole: currentRole,
        cart,
        favourites, 
        myOrders, 
        store
    }
    
    const accesstoken = JWT.sign(payload, process.env.ACCESS_TOKEN_SECRET, {expiresIn: process.env.EXPIRY_KEY_ACCESS});
    return accesstoken
}

const createRefreshToken = (userId) => {
    const refreshtoken = JWT.sign({userId: userId}, process.env.REFRESH_TOKEN_SECRET, {expiresIn: process.env.EXPIRY_KEY_REFRESH});
    return refreshtoken
}

const createResetPasswordToken = (user) => {
    const {_id, email } = user
    
    const payload = {
        userId: _id,
        email
    }
    const resetPasswordToken = JWT.sign(payload, process.env.RESET_PASSWORD_TOKEN_SECRET, {expiresIn: process.env.EXPIRY_KEY_RESET});
    return resetPasswordToken
}

module.exports = {
    createVerifyEmailToken,
    createAccessToken,
    createRefreshToken,
    createResetPasswordToken 

}