const mongoose = require('mongoose');
const MongoStore = require('connect-mongo');
require('dotenv').config();

const connectDb = () => {
    return mongoose.connect(process.env.MONGODB_URI, {useUnifiedTopology: true, useNewUrlParser: true})
} 

const store = new MongoStore(
    {
        mongoUrl: process.env.MONGODB_URI,
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

module.exports = {
    connectDb,
    store
}