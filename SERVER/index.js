const mongoose = require('mongoose');
require('dotenv').config()
const express = require('express');
const app = express();
const cors = require('cors');

const userRoutes = require('./routers/userRoutes');
const productRoutes = require('./routers/productRoutes')
const categoryRoutes = require('./routers/categoryroutes')
const cartRoutes = require('./routers/cartRoutes');
const favouritesRoutes = require('./routers/favouritesRoutes')
const orderRouter = require('./routers/orderRoutes')
const imageRouter = require('./routers/imageRoutes')

//  The { useUnifiedTopology: true, useNewUrlParser: true } options passed to the mongoose.connect method are used to ensure that the latest recommended options are used when establishing a connection to the MongoDB server.
mongoose.connect(process.env.MONGO_URI, {useUnifiedTopology: true, useNewUrlParser: true})
.then(() => {
console.log("connected to mongo database") 
 // use cors

app.use(cors())

// use middleware

app.use(express.json()) 

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

// use routes

app.use('/api/user', userRoutes) 
app.use('/api/shop', productRoutes) 
app.use('/api/category', categoryRoutes)
app.use('/api/cart', cartRoutes)
app.use('/api/favourites', favouritesRoutes)
app.use('/api/order', orderRouter)
app.use('/api/photo', imageRouter)

// listen to server;

app.listen(process.env.PORT, () => {
    console.log('server is listening and running on port', process.env.PORT)
})
})  