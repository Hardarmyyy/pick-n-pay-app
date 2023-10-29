const {allowedOrigins} = require('../Utilities/allowedOrigins')

const corsOptions = {
    origin: (origin, callback) => {
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) { // NOTE: || !origin should be removed after development
            callback(null, true)
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    }, 
    optionsSuccessStatus: 200 
}

module.exports = {
    corsOptions
}