const mongoose = require('mongoose');
const {format} = require('date-fns')
const User = require('../models/UserModel');
const Product = require('../models/ProductsModel');
const Category = require('../models/CategoryModel');


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
        const existingUser = await User.findById({_id: userId})
        if (!existingUser) return res.status(404).json({ 
            error: true, 
            message: "The user(seller) doesn't exist!" 
        })
        
        // create a new product and add to the user(seller) store
        const product = new Product({seller: userId, ...req.body, category: foundCategory.categoryName })
        await product.save()

        return res.status(200).json({
            success: true, 
            message: 'New product has been added successfully', 
            newProduct: product
        })
    }
    catch (err) {
        res.status(500).json({error: 'Internal server error', message: err.message})
    }
}

const allProducts =  async (req, res) => {

    try {
        const products = await Product.aggregate([
            {
                $project: {
                    _id: 0,
                    sellerId: "$seller",
                    productId: "$_id",
                    title: "$title",
                    price: "$price",
                    description: "$description",
                    category: "$category",
                    brand: "$brand",
                    countInStock: "$countInStock",
                    createdAt: "$createdAt",
                    updatedAt: "$updatedAt"
                }
            },
            {
                $sort: {
                    createdAt: -1
                }
            }
        ])

        const allProducts = await Promise.all(products.map( async (p) => {
            const createdTime = format(p.createdAt, 'yyyy-MM-dd hh:mm:ss a') 
            const updatedTime = format(p.updatedAt, 'yyyy-MM-dd hh:mm:ss a') 
            const seller = await User.findById({_id: p.sellerId})

            return {sellerName: seller.username, ...p, createdAt: createdTime, updatedAt: updatedTime}
        }))

        if (!products.length) return res.json({
            error: true, 
            message: 'The product list is empty', 
            emptyproducts: products
        })

        res.status(200).json({
            success: true, 
            message: 'All products fetched successfully', 
            products: allProducts,
            totalNumberOfProduct: products.length
        })
    }
    catch (err) {
        res.status(500).json({error: 'Internal server error', message: err.message})
    }
}

const sellerStoreProducts =  async (req, res) => {
        const {userId} = req.params

    try {
        
        const existingUser = await User.findOne({_id: userId})
        if (!existingUser) return res.status(404).json({ 
            error: true, 
            message: "The user(seller) doesn't exist!" 
        })

        const sellerProducts = await Product.aggregate([
            {
                $match: {
                    "seller": existingUser._id
                }
            },
            {
                $project: {
                    _id: 0,
                    productId: "$_id",
                    title: "$title",
                    price: "$price",
                    category: "$category",
                    countInStock: "$countInStock",
                    createdAt: "$createdAt",
                    updatedAt: "$updatedAt"
                }
            },
            {
                $sort: {
                    createdAt: -1
                }
            }
        ])
        
        const sellersStoreProducts = sellerProducts.map((p) => {
            const createdTime = format(p.createdAt, 'yyyy-MM-dd') 
            const updatedTime = format(p.updatedAt, 'yyyy-MM-dd') 
            return { ...p, createdAt: createdTime, updatedAt: updatedTime}
        })

        if (!sellerProducts.length) return res.json({
            error: true, 
            message: "The seller's product list is empty", 
            emptyStore: sellerProducts
        })
        
        res.status(200).json({
            success: true,
            message: 'All products for the seller is fetched successfully',
            sellersStore: sellersStoreProducts
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

        let product  = await Product.findById({_id: id})
        if (!product) return res.status(404).json({ 
            error: true, 
            message: "The product does not exist!" 
        })

        const existingUser = await User.findOne({username: username})
        if (!existingUser) return res.status(404).json({ 
            error: true, 
            message: "The user(seller) doesn't exist!" 
        })

        const sellerProducts = await Product.aggregate([
            {
                $match: {
                    "seller": existingUser._id
                }
            },
            {
                $project: {
                    _id: 0,
                    productId: "$_id",
                    title: "$title",
                    price: "$price",
                    category: "$category",
                    countInStock: "$countInStock",
                    createdAt: "$createdAt",
                    updatedAt: "$updatedAt"
                }
            }
        ])

        let existingProduct = sellerProducts.find((item) => item.productId.equals(id))

        if (!existingProduct) return res.status(404).json({ 
            error: true, 
            message: "Product not found in the user (seller) store!",
            product: product,
            sellerStoreProducts: sellerProducts
        })

        const createdTime = format(existingProduct.createdAt, 'yyyy-MM-dd') 
        const updatedTime = format(existingProduct.updatedAt, 'yyyy-MM-dd') 

        const singleProductFormatedDate = { ...existingProduct, createdAt: createdTime, updatedAt: updatedTime}
        
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
        let product  = await Product.findById({_id: id})
        if (!product) return res.status(404).json({ 
            error: true, 
            message: "The product does not exist!" 
        })

        const existingUser = await User.findOne({username: username})
        if (!existingUser) return res.status(404).json({ 
            error: true, 
            message: "The user(seller) doesn't exist!" 
        })

        const sellerProducts = await Product.aggregate([
            {
                $match: {
                    "seller": existingUser._id
                }
            },
            {
                $project: {
                    _id: 0,
                    productId: "$_id"
                }
            }
        ])

        let existingProduct = sellerProducts.find((item) => item.productId.equals(id))

        if (!existingProduct) return res.status(404).json({ 
            error: true, 
            message: "Product not found in the user (seller) store!",
            product: product,
            sellerStoreProducts: sellerProducts
        })
        
        // Check if the category exists in the database
        const foundCategory = await Category.findOne({ categoryName: category });

        if (!foundCategory) return res.status(404).json({ 
            error: true, 
            message: 'Invalid category selected.' 
        });
        
        // update the product with the request body;
        product.title = title,
        product.price = price,
        product.description = description,
        product.category = foundCategory.categoryName,
        product.brand = brand,
        product.countInStock = countInStock
        await product.save()
    
        return res.status(201).json({
            success: true,
            message: 'Product has been updated successfully',
            updatedProduct: product
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
        
        //check if the product is existing in the database
        let product  = await Product.findById({_id: id})
        if (!product) return res.status(404).json({ 
            error: true, 
            message: "The product does not exist!" 
        })

        const existingUser = await User.findOne({username: username})
        if (!existingUser) return res.status(404).json({ 
            error: true, 
            message: "The user(seller) doesn't exist!" 
        })

        const sellerProducts = await Product.aggregate([
            {
                $match: {
                    "seller": existingUser._id
                }
            },
            {
                $project: {
                    _id: 0,
                    productId: "$_id"
                }
            }
        ])

        let existingProduct = sellerProducts.find((item) => item.productId.equals(id))

        if (!existingProduct) return res.status(404).json({ 
            error: true, 
            message: "Product not found in the user (seller) store!",
            product: product,
            sellerStoreProducts: sellerProducts
        })

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
    sellerStoreProducts,
    allProducts
}
