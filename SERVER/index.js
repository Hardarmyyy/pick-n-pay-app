const path = require('path');
require('dotenv').config();
const express = require('express');
const app = express();
const {connectDb, store} = require('./Utilities/db.js')
const session = require('express-session');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const {logger} = require('./middleware/logEvents');
const {checkAuth} = require('./Middleware/checkAuth');
const {credentails} = require('./Middleware/credentials');
const {corsOptions} = require('./Utilities/corsOptions');


const authRoutes = require('./routes/authRoutes')
const publicRoutes = require('./routes/publicRoutes')
const userRoutes = require('./routes/userRoutes');
const categoryRoutes = require('./routes/categoryRoutes')
const productRoutes = require('./routes/productRoutes')
const cartRoutes = require('./routes/cartRoutes')
const favouritesRoutes = require('./routes/favouritesRoutes')
const shippingAddressRoutes = require('./routes/shippingAddressRoutes')
const orderRoutes = require('./routes/orderRoutes.js')


connectDb()
.then(() => {

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


    //listen for requests when server emits the send event to be ready for request
    const server = app.listen(process.env.PORT || PORT, ()=> {
        console.log('Connected to Database and Server is listening and running on port ' + process.env.PORT)
        process.send('ready', () => {
            console.log('Server is ready to receive requests')
        })
    })
    
    // Handling graceful shutdown 
    process.on('message', (msg) => {
        if (msg == 'shutdown') {
            console.log('Shutdown signal is received')
            console.log('Closing all connections...and getting ready to close server')
    
            setTimeout(() => {
                console.log('Shutting down server and all database connection...')
                server.close(() => {
                    mongoose.connection.close(false, () => {
                        console.log('MongoDB connection closed')
                    })
                    console.log('server closed successfully')
                    process.exit(0)
                })
            }, 1500)
        }
    })
})
.catch((err) => {
    console.log(err)  
}) 

// Export the Express API for vercel build up process
module.exports = app;