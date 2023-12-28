const express = require('express');
const routes = express.Router();
const { test, signUp, verifyEmailToken, emailVerification, signIn, forgotPassword, verifyResetToken, resetPassword, refreshToken, logout} = require('../controllers/authController')

// auth routes
routes.get('/', test)
routes.post('/signup', signUp);
routes.get('/verify-email-token', verifyEmailToken);
routes.post('/verify', emailVerification);
routes.post('/login', signIn);
routes.post('/forgot', forgotPassword); 
routes.get('/verify-reset-token', verifyResetToken);
routes.post('/reset', resetPassword);
routes.get('/refresh', refreshToken);
routes.get('/logout', logout);


module.exports = routes;     