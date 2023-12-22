const JWT = require('jsonwebtoken');
require('dotenv').config();

const checkAuth = (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (!authHeader?.startsWith('Bearer ')) return res.status(401).json({error:'Unauthorized'})
    const token = authHeader.split(' ')[1];
    JWT.verify(
        token, 
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) => {
            if (err) return res.status(403).json({error: err.message});  // invalid token;
            req.userId = decoded.userId;
            req.userRole = decoded.userRole;
            next();
    })
}

module.exports = {
    checkAuth
} 