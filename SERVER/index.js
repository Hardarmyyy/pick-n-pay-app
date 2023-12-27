const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config();
const express = require('express');
const app = express();
const session = require('express-session');
const MongoStore = require('connect-mongo');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const {logger} = require('./middleware/logEvents');
const {checkAuth} = require('./Middleware/checkAuth');
const {credentails} = require('./Middleware/credentials');
const {corsOptions} = require('./Utilities/corsOptions');
const cron = require('node-cron'); // added node-cron to do a cronjob of sending request every 30seconds to keep server active without cold start
const axios = require('axios');

const authRoutes = require('./routers/authRoutes')
const publicRoutes = require('./routers/publicRoutes')
const userRoutes = require('./routers/userRoutes');
const categoryRoutes = require('./routers/categoryRoutes')
const productRoutes = require('./routers/productRoutes')
const cartRoutes = require('./routers/cartRoutes')
const favouritesRoutes = require('./routers/favouritesRoutes')
const shippingAddressRoutes = require('./routers/shippingAddressRoutes')
const orderRoutes = require('./routers/orderRoutes.js')


const store = new MongoStore(
    {
        mongoUrl: process.env.MONGO_URI,
        collection: 'mySessions',
        autoRemove: 'native', // Enable automatic removal of expired sessions
    }, 
    function(error) {
        console.log(error);
    }
);

// Catch errors
store.on('error', function(error) {
    console.log(error);
});

//  The { useUnifiedTopology: true, useNewUrlParser: true } options passed to the mongoose.connect method are used to ensure that the latest recommended options are used when establishing a connection to the MongoDB server.
mongoose.connect(process.env.MONGO_URI, {useUnifiedTopology: true, useNewUrlParser: true})
    .then(() => {
    
    // Define a cronjob to send request to the server, preventing it from cold start
    const serverUrl = 'https://pick-n-pay-app-backend.vercel.app/api/v1/all-products'
    cron.schedule('* * * * * *', async () => {
        try {
            // send request to the server every 30seconds to keep it active
            const response = await axios.get(serverUrl);
            console.log(`pinged ${serverUrl} at ${new Date().toLocaleTimeString()}`);
        } 
        catch (error) {
            console.error(`Error pinging ${serverUrl}: ${error.message}`)
        }
    });

    // Custom logger middleware
    app.use(logger);

    // Use session middleware
    app.use(
        session({
            secret: process.env.SESSION_SECRET,
            resave: false,
            saveUninitialized: true,
            store: store,
            cookie: { 
                maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
                secure: process.env.NODE_ENV === 'production',
                httpOnly: true, 
                secure: true,
            }, 
        })
    );
    
    
    // handle options credentials check before CORS 
    // fetch cookies credentails requirements
    app.use(credentails);

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
    app.use('/api/v1', publicRoutes)
    app.use('/api/v1', cartRoutes) 

    app.use(checkAuth) // user authentication middleware
    app.use('/api/v1', userRoutes) 
    app.use('/api/v1', categoryRoutes) 
    app.use('/api/v1', productRoutes) 
    app.use('/api/v1', favouritesRoutes) 
    app.use('/api/v1', shippingAddressRoutes) 
    app.use('/api/v1', orderRoutes)  


    // listen to server;
    app.listen(process.env.PORT, () => {
        console.log(`server is connected to db and listening on port ${process.env.PORT}`);
    })
})  

// Export the Express API for vercel build up process
module.exports = app;