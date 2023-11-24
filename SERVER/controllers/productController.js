const mongoose = require('mongoose');
const {format} = require('date-fns')
const User = require('../models/UserModel');
const Product = require('../models/ProductsModel');
const Category = require('../models/CategoryModel');
const Store = require('../models/StoreModel');


const addProduct = async (req, res) => {
        const {userId} = req.params
        const {title, price, description, category, brand, countInStock} = req.body

    try {
        if (!mongoose.Types.ObjectId.isValid(userId)) return res.json({
            error: true, 
            message: 'Invalid id'
        })
        
        if (!title || !price || !description || !category || !brand || !countInStock) return res.status(404).json({ 
            error: true, 
            message: 'All fields are required.' 
        });
        
        // Check if the specified category exists in the database
        const foundCategory = await Category.findOne({ categoryName: category });
        if (!foundCategory) return res.status(404).json({ 
            error: true, 
            message: 'Invalid category selected.' 
        });
        
        // check if the user(seller) exist
        const existingUser = await User.findOne({_id: userId})
        if (!existingUser) return res.status(404).json({ 
            error: true, 
            message: "The user(seller) doesn't exist!" 
        })
        
        // create a new product and add to the user(seller) store
        const product = new Product({sellerId: userId, ...req.body, category: foundCategory.categoryName })
        await product.save()

        // check if the user(seller) has an existing store
        let store = await Store.findOne({sellerId: userId})

        if (!store) { // create a new store for the user(seller) if the user does not have a store
            store = new Store({sellerId: userId, myStore: [product]})
            await store.save()
            return res.status(200).json({
                success: true, 
                message: 'New store has been created and product is added to store successfully', 
                newStore: store
            })
        } 
        // if the user(seller) has an existing store 
        store.myStore.push(product)
        await store.save()
        return res.status(200).json({
            success: true, 
            message: 'New product has been added to the existing store successfully', 
            existingStore: store
        })
    }
    catch (err) {
        res.status(500).json({error: 'Internal server error', message: err.message})
    }
}

const allProducts =  async (req, res) => {

    try {
        const products = await Product.find({}).sort({createdAt: -1}).lean();

        const allProducts = await Promise.all(products.map( async (p) => {

            const createdTime = format(p.createdAt, 'yyyy-MM-dd hh:mm:ss a') // formatting the created datetime
            const updatedTime = format(p.updatedAt, 'yyyy-MM-dd hh:mm:ss a') // formatting the updated datetime
            return {...p, createdAt: createdTime, updatedAt: updatedTime}
        }))

        if (!allProducts.length) return res.json({
            error: true, 
            message: 'The product list is empty', 
            products: allProductsWithSellerName
        })

        res.status(200).json({
            success: true, 
            message: 'All products fetched successfully', 
            products: allProducts
        })
    }
    catch (err) {
        res.status(500).json({error: 'Internal server error', message: err.message})
    }
}

const storeProducts =  async (req, res) => {
        const {userId} = req.params

    try {
        
        // check if the user(seller) exist in the database
        const existingUser = await User.findOne({_id: userId})
        if (!existingUser) return res.status(404).json({ 
            error: true, 
            message: "The user(seller) doesn't exist!" 
        })

        // check if the user has an existing store
        let store = await Store.findOne({sellerId: userId})

        if (!store) { // create a new store for the user(seller)

            const newStore = new Store({sellerId: userId, myStore: []})
            await newStore.save()

            return res.status(404).json({ 
                error: true, 
                message: "The user does not have any product in the store!",
                emptyStore: newStore
            })
        }
        else if (store.myStore.length == 0) return res.status(404).json({ 
            success: true, 
            message: "The user does not have any existing product in the store!",
            emptyStore: store
        })
        
        const allProductsInStore = await Promise.all(store.myStore.map( async(product) => {
            return {productId: product._id, title: product.title, price: product.price, category: product.category, brand: product.brand, countInStock: product.countInStock}
        }))
        
        res.status(200).json({
            success: true,
            message: 'All products in store fetched successfully',
            allProductsInStore: allProductsInStore
        });        
    }
    catch (err) {
        res.status(500).json({error: 'Internal server error', message: err.message})
    }
}

const singleProduct = async (req, res) => {
    const {id} = req.params
    const {username} = req.query

    try {
        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({ 
            error: true, 
            message:  "The product ID is invalid!" 
        })
        
        //check if the product is existing
        let product  = await Product.findById({_id: id})
        if (!product) return res.status(404).json({ 
            error: true, 
            message: "The product does not exist!" 
        })

        const user = await User.findOne({username: username})

        // find the store where the product exist in the user(seller) store
        let store = await Store.findOne({sellerId: user._id}) 
        let existingStoreItem = store.myStore.find((item) => item._id.equals(id))

        if (!existingStoreItem) return res.status(404).json({ 
            error: true, 
            message: "The product does not exist in the user (seller) store!",
            product: product,
            existingStore: store
        })

        const createdTime = format(product.createdAt, 'yyyy-MM-dd hh:mm:ss a') // formatting the created datetime
        const updatedTime = format(product.updatedAt, 'yyyy-MM-dd hh:mm:ss a') // formatting the updated datetime

        const singleProductFormatedDate = {
            _id: product._id, 
            sellerId: product.sellerId, 
            title: product.title, 
            price: product.price,
            description: product.description, 
            category: product.category,
            brand: product.brand, 
            topSelling: product.topSelling, 
            likes: product.likes, 
            countInStock: product.countInStock,
            createdAt: createdTime, 
            updatedAt: updatedTime
        }
        
        res.status(200).json({
            success: true, 
            message: 'Single product fetched successfully', 
            singleProduct: singleProductFormatedDate
        })
        
    }
    catch (err) {
        res.status(500).json({error: 'Internal server error', message: err.message})
    }
}

const updateProduct = async (req, res) => {
    const {id} = req.params
    const {username} = req.query
    const {title, price, description, category, brand, countInStock} = req.body

    try {
        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({ 
            error: true, 
            message: "The product ID is invalid!"
        })

        if (!title || !price || !description || !category || !brand || !countInStock) return res.status(404).json({ 
            error: true, 
            message: 'All fields are required.' 
        });
        
        //check if the product is existing in the database
        let existingProduct  = await Product.findById({_id: id})

        if (!existingProduct) return res.status(404).json({ 
            error: true, 
            message: "The product does not exist!" 
        })

        const user = await User.findOne({username: username})

        // find the store where the product exist in the user(seller) store
        let store = await Store.findOne({sellerId: user._id}) 
        let existingStoreItem = store.myStore.find((item) => item._id.equals(id))

        if (!existingStoreItem) return res.status(404).json({ 
            error: true, 
            message: "The product does not exist in the user (seller) store!",
            existingProduct: existingProduct,
            existingStore: store
        })
        
        // Check if the category exists in the database
        const foundCategory = await Category.findOne({ categoryName: category });

        if (!foundCategory) return res.status(404).json({ 
            error: true, 
            message: 'Invalid category selected.' 
        });
        
        // update the product in the user(seller) store with the request body;
        existingStoreItem.title = title,
        existingStoreItem.price = price,
        existingStoreItem.description = description,
        existingStoreItem.category = foundCategory.categoryName,
        existingStoreItem.brand = brand,
        existingStoreItem.countInStock = countInStock
        await store.save()

        // update the product with the request body;
        existingProduct.title = title,
        existingProduct.price = price, 
        existingProduct.description = description,
        existingProduct.category = foundCategory.categoryName,
        existingProduct.brand = brand
        existingProduct.countInStock = countInStock
        await existingProduct.save()
    
        return res.status(201).json({
            success: true,
            message: 'Product has been updated successfully',
            existingProduct: existingProduct,
            existingStoreItem: existingStoreItem
        })
    }
    catch (err) {
        res.status(500).json({error: 'Internal server error', message: err.message})
    }
}

const deleteProduct = async (req, res) => {
        const {id} = req.params
        const {username} = req.query
    try {
        
        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({ 
            error: true, 
            message: "The product ID is invalid!" 
        })
        
        //check if the product is existing
        let existingProduct  = await Product.findById({_id: id})

        if (!existingProduct)  return res.status(404).json({ 
            error: true, 
            message:  "The product does not exist!" 
        })

        const user = await User.findOne({username: username})

        // find the store where the product exist in the user(seller) store
        let store = await Store.findOne({sellerId: user._id}) 
        let existingStoreItem = store.myStore.find((item) => item._id.equals(id))

        if (!existingStoreItem) return res.status(404).json({ 
            error: true, 
            message: "The product does not exist in the user (seller) store!",
            existingProduct: existingProduct,
            existingStore: store
        })

        // Delete the product from the user(seller) store;
        const updatedStore = await Store.findByIdAndUpdate({_id: store._id}, {$pull: { "myStore": {_id: id} }})

        // Delete the product from all product listings;
        const DeletedProduct = await Product.findOneAndDelete({ _id: id })

        return res.status(201).json({ 
            success: true,
            message: 'Product has been deleted successfully', 
            deletedItem: DeletedProduct
        })
    }
    catch (err) {
        res.status(500).json({error: 'Internal server error', message: err.message})
    }
}



module.exports = {
    addProduct, 
    singleProduct, 
    updateProduct, 
    deleteProduct, 
    storeProducts,
    allProducts
}
