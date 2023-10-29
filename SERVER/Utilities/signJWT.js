const JWT = require('jsonwebtoken');
require('dotenv').config();

const createOtpToken = (userId) => {
    const otpToken = JWT.sign({userId: userId}, process.env.OTP_TOKEN_SECRET);
    return otpToken
}

const createVerifyEmailToken = (userId) => {
    const verifyEmailToken = JWT.sign({userId: userId}, process.env.VERIFY_EMAIL_TOKEN_SECRET, {expiresIn: process.env.EXPIRY_KEY_EMAIL});
    return verifyEmailToken
}

const createAccessToken = (user) => {
    const {_id, username, email, roles, cart, favourites, myOrders, shop, customerOrders } = user

    const currentRole = Object.values(roles).filter(Boolean) // getting the value of roles from the user object

    const payload = {
        userId: _id,
        username,
        email,
        userRole: currentRole,
        cart,
        favourites, 
        myOrders, 
        shop, 
        customerOrders
    }
    
    const accesstoken = JWT.sign(payload, process.env.ACCESS_TOKEN_SECRET, {expiresIn: process.env.EXPIRY_KEY_ACCESS});
    return accesstoken
}

const createRefreshToken = (userId) => {
    const refreshtoken = JWT.sign({userId: userId}, process.env.REFRESH_TOKEN_SECRET, {expiresIn: process.env.EXPIRY_KEY_REFRESH});
    return refreshtoken
}

const createResetPasswordToken = (userId) => {
    const resetPasswordToken = JWT.sign({userId: userId}, process.env.RESET_PASSWORD_TOKEN_SECRET);
    return resetPasswordToken
}

module.exports = {
    createVerifyEmailToken,
    createOtpToken,
    createAccessToken,
    createRefreshToken,
    createResetPasswordToken 

}