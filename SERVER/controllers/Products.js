const mongoose = require('mongoose');
const Product = require('../models/ProductsModel');
const Buyer = require('../models/BuyerModel')
const Category = require('../models/CategoryModel');
const Shop = require('../models/ShopModel');
const Seller = require('../models/SellerModel');


// define a route for seller to add new product to shop; NOTE: pass in the seller_id as params
exports.createProduct = async(req, res, next) => {
    try {
        const {title, price, photo, description, category, special, stockQty} = req.body
        if (!title || !price || !description || !category || !stockQty) {
            return res.status(400).json({ error: 'All fields are required.' });
        }
        if (title.length > 30 ) {
            return res.status(400).json({ error: 'title is too long' });
        }
        if (price < 0.1) {
            return res.status(400).json({ error: 'minimum price should be more than 0' });
        }
        if (description.length > 400) {
            return res.status(400).json({ error: 'description should be between 0 - 400 characters' });
        }
         // Check if the specified category exists in the database
        const foundCategory = await Category.findOne({ name: category });
        if (!foundCategory) {
            return res.status(400).json({ error: 'Invalid category selected.' });
        }
        if (stockQty < 1) {
            return res.status(400).json({ error: 'minimum stock should be at least 1' });
        }
            const {username} = req.params
        // check if the seller exist
            const seller = await Seller.findOne({username: username})
        if (!seller) {
            return res.status(400).json({ error: "seller doesn't exist!" })
        }
        else if (seller) {
            const product = new Product({sellerName: username, ...req.body, category: foundCategory.name })
            await product.save()
            // check if the seller has an existing shop
            let shop = await Shop.findOne({sellerName: username})
            if (!shop) { // create a new shop for the seller if the seller does not have a shop
                shop = new Shop({sellerName: username, myShop: [product]})
                await shop.save()
                return res.status(201).json({shop})
            } 
            else {
                shop.myShop.push(product)
                await shop.save()
                return res.status(201).json({shop})
            }
        }
    }
    catch (error) {
        res.status(500).send({ error: error.message });
    }
}

// define a route to get all products from a seller shop; NOTE: pass in the seller_id as params
exports.allProducts =  async (req, res, next) => {
    try {
            const {username} = req.params
        // check if the seller exist
            const seller = await Seller.findOne({username: username})
        if (!seller) {
            return res.status(404).json({ error: "Seller does not exist!" })
        }
        else if (seller) {
             // check if the seller has an existing shop
                let shop = await Shop.findOne({sellerName: username})
            if (!shop) {
                return res.status(400).json({ error: "The seller doesn't have any product in the shelves!" })
            }
            else {
                //display the products with seller name
                const allProductsWithSellerName = await Promise.all(shop.myShop.map( async(product) => {
                    return {productID: product._id, title: product.title, price: product.price, category: product.category, stockQty: product.stockQty}
                }))
                
                res.status(200).json({allProductsWithSellerName});
            } 
        }
    }
    catch (error) {
        res.status(500).send({error: error.message});
    }
}

// define a route to get a single product from seller shop; NOTE: pass in the seller_id as params
exports.findAProduct = async (req, res, next) => {
    try {
        // check and validate if the request _id is a mongoDB id;
        const  {productid}  = req.params
        if (!mongoose.Types.ObjectId.isValid(productid)) {
            return res.status(404).json({ error: "The product ID is invalid!" })
        }
        //check if the product is existing
            let product  = await Product.findById({_id: productid})
        if (!product) {
            return res.status(404).json({ error: "The product does not exist!" })
        }
            const {username} = req.params
        // check if the seller exist
            const seller = await Seller.findOne({username: username})
        if (!seller) {
            return res.status(404).json({ error: "Seller does not exist!" })
        }
        else if (seller) {
                // check if the seller has an existing shop
                    let shop = await Shop.findOne({sellerName: username})
                if (!shop) {
                    return res.status(400).json({ error: "The seller doesn't have any product in the shelves!"})
                }
                else { // check the products in the shop to get the particular product
                    const shopItem = shop.myShop.find((item) => item._id.equals(productid))
                    if (!shopItem) {
                        return res.status(400).json({ error: "The product does not exist in the seller shop!"})
                    }
                    else {
                        return res.status(201).json({product})
                    }
                }
        }
    }
    catch (error) {
        res.status(500).send({error: error.message});
    }
}

// define a route for seller to update product in the shop; NOTE: pass in the seller_id as params
exports.updateProduct = async (req, res, next) => {
    try {
         // check and validate if the request _id is a mongoDB id;
        const  {productid}  = req.params
        if (!mongoose.Types.ObjectId.isValid(productid)) {
            return res.status(404).json({ error: "The product ID is invalid!" })
        }
        //check if the product is existing
            let product  = await Product.findById({_id: productid})
        if (!product) {
            return res.status(404).json({ error: "The product does not exist!" })
        }
            const {username} = req.params
        // check if the seller exist
            const seller = await Seller.findOne({username: username})
        if (!seller) {
            return res.status(404).json({ error: "Seller does not exist!" })
        }
        // check if the seller has an existing shop
            let shop = await Shop.findOne({sellerName: username})
        if (!shop) {
            return res.status(400).json({ error: "The seller doesn't have any product in the shelves!"})
        }
        else { // check the products in the shop to get the particular product
            const shopItem = shop.myShop.find((item) => item._id.equals(productid))
            if (!shopItem) {
                return res.status(400).json({ error: "The product does not exist in the seller shop!"})
            }
            else if (shopItem) { // if the product is existing in the seller shop
                    const {title, price, photo, description, category, special, stockQty} = req.body
                    if (!title || !price || !description || !category || !stockQty) {
                        return res.status(400).json({ error: 'All fields are required.' });
                    }
                    if (title.length > 30 ) {
                        return res.status(400).json({ error: 'title is too long' });
                    }
                    if (price < 0.1) {
                        return res.status(400).json({ error: 'minimum price should be more than 0' });
                    }
                    if (description.length > 400) {
                        return res.status(400).json({ error: 'description should be between 0 - 400 characters' });
                    }
                     // Check if the specified category exists in the database
                    const foundCategory = await Category.findOne({ name: category });
                    if (!foundCategory) {
                        return res.status(400).json({ error: 'Invalid category selected.' });
                    }
                    if (stockQty < 1) {
                        return res.status(400).json({ error: 'minimum stock should be at least 1' });
                    }
                    // update the shop with the request body;
                        shopItem.title = title,
                        shopItem.price = price,
                        shopItem.description = description,
                        shopItem.category = foundCategory.name,
                        shopItem.stockQty = stockQty
                        await shop.save()
                    // update the product with the request body;
                        product.title = title,
                        product.price = price, 
                        product.description = description,
                        product.category = foundCategory.name,
                        product.stockQty = stockQty
                        await product.save()
                    
                        return res.status(201).json({shopItem})
            }
        }
    }
    catch (error) {
        res.status(500).send({error: error.message});
    }
}

// define a route for seller to delete product from the shop;  NOTE: pass in the seller_id as params
exports.deleteProduct = async (req, res, next) => {
    try {
            const {username} = req.params
        // check if the seller exist
            const seller = await Seller.findOne({username: username})
        if (!seller) {
            return res.status(404).json({ error: "Seller does not exist!" })
        }
        // check and validate if the request _id is a mongoDB id;
            const  {productid}  = req.params
        if (!mongoose.Types.ObjectId.isValid(productid)) {
            return res.status(404).json({ error: "The product ID is invalid!" })
        }
        //check if the product is existing
            let product  = await Product.findById({_id: productid})
        if (!product) {
            return res.status(404).json({ error: "The product does not exist!" })
        }
        // check if the seller has an existing shop
            let shop = await Shop.findOne({sellerName: username})
        if (!shop) {
            return res.status(400).json({ error: "The seller doesn't have any product in the shelves!"})
        }
        else {// check the products in the shop to get the particular product
                const shopItem = shop.myShop.find((item) => item._id.equals(productid))
                if (!shopItem) {
                    return res.status(400).json({ error: "The product does not exist in the seller shop!"})
                }
                if (shopItem) {
                    // remove the product from the seller shop;
                    const newShop = await Shop.findByIdAndUpdate({_id: shop._id}, {$pull: { "myShop": {_id: productid} }})
                    // remove the product from all product listings;
                    const removedItem = await Product.findOneAndDelete({ _id: productid })
                    return res.status(201).json({removedItem})
                }
        }
    }
    catch (error) {
        res.status(500).send({error: error.message});
    }
}

// define an admin route to get all products from all sellers
exports.allProductFromAllSellers =  async (req, res) => {
    try {
        const products = await Product.find({}).sort({date_added: -1}).lean();
        if (!products.length) {
            res.status(404).json({error: 'Products not found'})
        }

        // display products with username
        const productsWithSellersname = await Promise.all(products.map( async(product) => {
            const seller = await Seller.findOne({username: product.sellerName})
            return {...product, sellerID: seller._id}
        }))
        res.status(200).json(productsWithSellersname);
    }
    catch (error) {
        res.status(500).send({error: error.message});
    }
}
