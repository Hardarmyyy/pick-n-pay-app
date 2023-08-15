const express = require('express');
const routers = express.Router();
const {uploadImage, getImage, deleteImage, deleteAllImage} = require('../controllers/image')
const multer  = require('multer')

// import multer to create a diskstorage when uploading images
const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, '../CLIENT/public/productphoto/');
    },
    filename: function (req, file, callback) {
        const uniqueSuffix = Date.now();
        callback(null, uniqueSuffix + file.originalname);
    },
}); 

const upload = multer({ storage: storage })


// image routes
routers.post('/upload',  upload.single('image'), uploadImage);
routers.get('/fetch-image', getImage);
routers.delete('/delete/:id', deleteImage);
routers.delete('/delete', deleteAllImage);





module.exports = routers;  