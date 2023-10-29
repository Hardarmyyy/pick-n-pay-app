const path = require('path')
const mongoose = require('mongoose');
require('dotenv').config()
const express = require('express');
const app = express();
const cors = require('cors');
const {logger} = require('./middleware/logEvents')
const {checkAuth} = require('./Middleware/checkAuth')
const {credentails} = require('./Middleware/credentials')
const {corsOptions} = require('./Utilities/corsOptions')
const cookieParser = require('cookie-parser')


const authRoutes = require('./routers/authRoutes')
const userRoutes = require('./routers/userRoutes');

//  The { useUnifiedTopology: true, useNewUrlParser: true } options passed to the mongoose.connect method are used to ensure that the latest recommended options are used when establishing a connection to the MongoDB server.
mongoose.connect(process.env.MONGO_URI, {useUnifiedTopology: true, useNewUrlParser: true})
    .then(() => {

     // Custom logger middleware
    app.use(logger);
    
    // handle options credentials check before CORS 
    // fetch cookies credentails requirements
    app.use(credentails)

    // cross origin middleware
    app.use(cors(corsOptions));

    // build in middleware for serving files in public folder
    app.use(express.static(path.join(__dirname, 'public'))); // this is needed to make files available in public folder;

    // build in middleware for url encoded form data
    app.use(express.urlencoded({ extended: false }));

    // build in middleware for json 
    app.use(express.json());

    // middleware for cookies
    app.use(cookieParser());



    app.use('/api/v1', authRoutes)

    // use routes
    app.use(checkAuth)
    app.use('/api/v1', userRoutes) 

    // listen to server;

    app.listen(process.env.PORT, () => {
        console.log(`server is connected to db and listening on port ${process.env.PORT}`);
    })
})  

// Export the Express API for vercel build up process
module.exports = app;