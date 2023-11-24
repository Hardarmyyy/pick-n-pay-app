const express = require('express');
const routes = express.Router();
const { signUp, emailVerification, signIn, otpVerification, resendOtpVerification, forgotPassword, resetPassword, refreshToken, logout} = require('../controllers/authController')

// auth routes
routes.post('/signup', signUp);
routes.get('/verify', emailVerification);
routes.post('/login', signIn);
routes.post('/otp', otpVerification);
routes.get('/otp-resend', resendOtpVerification);
routes.post('/forgot', forgotPassword); 
routes.post('/reset', resetPassword);
routes.get('/refresh', refreshToken);
routes.get('/logout', logout);


module.exports = routes;     