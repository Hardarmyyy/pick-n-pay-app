const mongoose = require('mongoose'); 
const User = require('../models/UserModel');
const Cart = require('../models/CartModel');
const Product = require('../models/ProductsModel');



const addProductToCart = async (req, res) => { 
        const {id} = req.params
        const {username} = req.query

    try {
        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({ 
            error: true, 
            message: "The product ID is invalid!"
        })

        const exisitingProduct = await Product.findById({_id: id})
        if (!exisitingProduct) return res.status(404).json({ 
            error: true, 
            message: "product does not exist" 
        }) 

        // check if the existingProduct quantity is greater than 1 and in stock
        if (exisitingProduct.countInStock < 1) return res.status(404).json({ 
                error: true, 
                message: "product is out of stock" 
        })
        
        const newCartProduct = { 
            product: exisitingProduct._id, 
            seller: exisitingProduct.seller, 
            title: exisitingProduct.title, 
            price: exisitingProduct.price, 
            description: exisitingProduct.description, 
            category: exisitingProduct.category, 
            brand: exisitingProduct.brand, 
            quantity: 1
        };

        let cart;

        if (!username) { // If no username is provided, assume it's an unregistered user

            // Example: Assume you have a session-based cart
            let sessionCart = req.session.cart || { myCart: [], numberOfProducts: 0, subTotal: 0, shippingCost: 0, vat: 0, total: 0 };
            const existingCartProduct = sessionCart.myCart.find((item) => item.product === id);

            if (existingCartProduct) return res.status(404).json({
                error: true,
                message: "Product is already in the cart"
            });

            sessionCart.myCart.push(newCartProduct);

            // update the sessioncart properties before saving
            sessionCart.numberOfProducts = +sessionCart.numberOfProducts +  newCartProduct.quantity;
            sessionCart.subTotal = +sessionCart.subTotal.toFixed(2) + newCartProduct.price;
            const shippingCost = sessionCart.subTotal > 500 ? 80 : 50;
            const VAT = sessionCart.subTotal > 500 ? (7.5 / 100 ) * sessionCart.subTotal : (5 / 100 ) * sessionCart.subTotal;
    
            sessionCart.shippingCost = shippingCost;
            sessionCart.vat = VAT.toFixed(2);
            sessionCart.total = (sessionCart.subTotal + sessionCart.shippingCost + +sessionCart.vat).toFixed(2);

            // Save the session cart
            req.session.cart = sessionCart;

            return res.status(201).json({
                success: true,
                message: 'Product added to cart successfully for unregistered user',
                cart: sessionCart
            });
        }

        // check and validate if the user has an existing cart;
        const existingUser = await User.findOne({username: username})
        if (!existingUser) return res.status(404).json({
            error: true,
            message: "User not found"
        });

        // Check if the user has an existing cart
        cart = await Cart.findOne({buyer: existingUser._id })

        if (!cart) { // create a new cart for the user(buyer) if the user does not have an existing cart
                
            cart = new Cart({ buyer: existingUser._id, myCart: [newCartProduct] })

            // update the cart properties before saving 
            cart.numberOfProducts += newCartProduct.quantity;
            cart.subTotal += newCartProduct.price;
            const shippingCost = cart.subTotal > 500 ? 80 : 50;
            const VAT = cart.subTotal > 500 ? (7.5 / 100 ) * cart.subTotal : (5 / 100 ) * cart.subTotal;
    
            cart.shippingCost = shippingCost;
            cart.vat = VAT.toFixed(2);
            cart.total = (cart.subTotal + cart.shippingCost + cart.vat).toFixed(2);
            await cart.save()
    
            return res.status(201).json({
                success: true, 
                message: 'New cart has been created and new product is added to cart successfully', 
                newCart: cart
            })
        }

        // check if the product is already existing in the cart 
        const existingCartProduct = cart.myCart.find((item) => item.product === id)
        if (existingCartProduct) return res.status(404).json({ 
            error: true, 
            message: "product is existing in the cart already" 
        })
        
        cart.myCart.push(newCartProduct)
        
        // update the cart properties before saving
        cart.numberOfProducts += newCartProduct.quantity;
        cart.subTotal = +cart.subTotal.toFixed(2) + newCartProduct.price;
        const shippingCost = cart.subTotal > 500 ? 80 : 50;
        const VAT = cart.subTotal > 500 ? (7.5 / 100 ) * cart.subTotal : (5 / 100 ) * cart.subTotal;

        cart.shippingCost = shippingCost;
        cart.vat = VAT.toFixed(2);
        cart.total = (cart.subTotal + cart.shippingCost + cart.vat).toFixed(2);
        await cart.save()

        return res.status(201).json({
            success: true, 
            message: 'New product has been added to existing cart successfully', 
            existingCart: cart
        })
    }
    catch (err) {    
        res.status(500).json({error: 'Internal server error', message: err.message})
    }
}

const fetchCartProducts =  async(req, res) => {
        const { username } = req.query;

    try {

        if (!username) { // If no username is provided, assume it's an unregistered user

            let sessionCart = req.session.cart;
            if (!sessionCart) {
                sessionCart = { 
                    myCart: [], 
                    numberOfProducts: 0,
                    subTotal: 0, 
                    shippingCost: 0, 
                    vat: 0, 
                    total: 0 
                };

                req.session.cart = sessionCart;
    
                return res.status(201).json({
                    success: true,
                    message: "The unregistered user does not have any product in the cart",
                    existingCart: sessionCart,
                });
            }

            if (sessionCart.myCart.length === 0) return res.status(201).json({
                success: true,
                message: "The existing cart is empty for unregistered user",
                existingCart: sessionCart,
            });

            return res.status(201).json({ 
                success: true, 
                message: 'Cart products fetched successfully for unregistered user', 
                existingCart: sessionCart
            })
        }
        
        const existingUser = await User.findOne({username: username})
        if (!existingUser) return res.status(404).json({
            error: true, 
            message: "Sorry! The user does not exist" 
        })
        
        // check if the user(buyer) has an existing cart;
        let cart = await Cart.findOne({buyer: existingUser._id})

        if (!cart) {
            // create a new cart for the user (buyer)
            const newCart = await new Cart({ buyer: existingUser._id, myCart: [] })
            await newCart.save()

            return res.status(404).json({ 
                error: true, 
                message: 'The user does not have any product in the cart', 
                emptyCart: newCart 
            })
        }

        else if (cart.myCart.length == 0) return res.status(201).json({
            success: true, 
            message: 'The user does not have any product in the cart', 
            existingCart: cart
        });

        return res.status(201).json({ 
            success: true, 
            message: 'Cart products fetched successfully', 
            existingCart: cart
        })
    } 
    catch (err) {
        res.status(500).json({error: 'Internal server error', message: err.message})
    }
}

const addQuantity =  async (req, res) => {
        const {id} = req.params
        const {username} = req.query

    try {
        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({ 
            error: true, 
            message: "The product ID is invalid!"
        })

        const existingProduct = await Product.findById({_id: id})
        if (!existingProduct) return res.status(404).json({ 
            error: true, 
            message: "product does not exist" 
        }) 

        // check if the existingProduct quantity is greater than 1 and in stock
        if (existingProduct.countInStock < 1) return res.status(404).json({ 
            error: true, 
            message: "product is out of stock" 
        })

        if (!username) { // If no username is provided, assume it's an unregistered user
            let sessionCart = req.session.cart;

            //check if the product is existing in the unregistered user cart
            let existingSessionCartProduct = sessionCart.myCart.find((item) => item.product === id)
            if (!existingSessionCartProduct) return res.status(404).json({ 
                error: true, 
                message: "Sorry! The product does not exist this unregistered user cart",
                product: existingProduct._id,
                existingCart: sessionCart 
            })

            // Check if incrementing the quantity would exceed the countInStock
            if (existingProduct.countInStock < existingSessionCartProduct.quantity + 1) {
                return res.status(404).json({
                    error: true,
                    message: "Product is out of stock"
                });
            }

            existingSessionCartProduct.quantity ++;

            // update the cart properties before saving 
            sessionCart.numberOfProducts ++;
            sessionCart.subTotal = (+sessionCart.subTotal + existingSessionCartProduct.price).toFixed(2);
            const shippingCost = sessionCart.subTotal > 500 ? 80 : 50;
            const VAT = sessionCart.subTotal > 500 ? (7.5 / 100 ) * sessionCart.subTotal : (5 / 100 ) * sessionCart.subTotal;

            sessionCart.shippingCost = shippingCost;
            sessionCart.vat = VAT.toFixed(2);
            sessionCart.total = (+sessionCart.subTotal + +sessionCart.shippingCost + +sessionCart.vat).toFixed(2);

            // Save the session cart
            req.session.cart = sessionCart;

            return res.status(201).json({ 
                success: true, 
                message: `The quantity of product with the id ${id} has been updated successfully for unregistered user` , 
                updatedCart: sessionCart
            })
        }
        
        // check and validate if the user(buyer) has an existing cart;
        const existingUser = await User.findOne({username: username})
        if (!existingUser) return res.status(404).json({ 
            error: true, 
            message: "Sorry! The user does not exist" 
        })
    
        // check if the user(buyer) has an existing cart
        let cart = await Cart.findOne({buyer: existingUser._id})

        //check if the product is existing in the user(buyer) cart
        let existingCartProduct = cart.myCart.find((item) => item.product.equals(id))
        if (!existingCartProduct) return res.status(404).json({ 
            error: true, 
            message: "Sorry! The product does not exist this user cart",
            product: existingProduct._id,
            existingCart: cart
        })

        // Check if incrementing the quantity would exceed the countInStock
        if (existingProduct.countInStock < existingCartProduct.quantity + 1) {
            return res.status(404).json({
                error: true,
                message: "Product is out of stock"
            });
        }
        
        existingCartProduct.quantity ++;

        // update the cart properties before saving 
        cart.numberOfProducts ++;
        cart.subTotal = (+cart.subTotal + existingCartProduct.price).toFixed(2);
        const shippingCost = cart.subTotal > 500 ? 80 : 50;
        const VAT = cart.subTotal > 500 ? (7.5 / 100 ) * cart.subTotal : (5 / 100 ) * cart.subTotal;

        cart.shippingCost = shippingCost;
        cart.vat = VAT.toFixed(2);
        cart.total = (cart.subTotal + cart.shippingCost + cart.vat).toFixed(2);
        await cart.save()

        return res.status(201).json({ 
            success: true,
            message: `The quantity of product with the id of ${id} has been updated successfully`,
            updatedCart: cart
        })
    } 
    catch (err) {
        res.status(500).json({error: 'Internal server error', message: err.message})
    }
}

const decrementQuantity = async (req, res) => {
        const {id} = req.params
        const {username} = req.query

    try {
        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({ 
            error: true, 
            message: "The product ID is invalid!"
        })

        const existingProduct = await Product.findById({_id: id})
        if (!existingProduct) return res.status(404).json({ 
            error: true, 
            message: "product does not exist" 
        }) 

        if (!username) { // If no username is provided, assume it's an unregistered user
            let sessionCart = req.session.cart;

            //check if the product is existing in the unregistered user cart
            let existingSessionCartProduct = sessionCart.myCart.find((item) => item.product === id)

            if (!existingSessionCartProduct) return res.status(404).json({ 
                error: true, 
                message: "Sorry! The product does not exist this unregistered user cart",
                product: id,
                existingCart: sessionCart 
            })

            if (existingSessionCartProduct && existingSessionCartProduct.quantity == 1) return res.status(404).json({
                error: true, 
                message: "Sorry! The minimum quantity for the product is 1 " 
            })

            existingSessionCartProduct.quantity --;

            // update the cart properties before saving 
            sessionCart.numberOfProducts --;
            sessionCart.subTotal = (+sessionCart.subTotal - existingSessionCartProduct.price).toFixed(2);
            const shippingCost = sessionCart.subTotal > 500 ? 80 : 50;
            const VAT = sessionCart.subTotal > 500 ? (7.5 / 100 ) * sessionCart.subTotal : (5 / 100 ) * sessionCart.subTotal;

            sessionCart.shippingCost = shippingCost;
            sessionCart.vat = VAT.toFixed(2);
            sessionCart.total = (+sessionCart.subTotal + +sessionCart.shippingCost + +sessionCart.vat).toFixed(2);

            // Save the session cart
            req.session.cart = sessionCart;

            return res.status(201).json({ 
                success: true, 
                message: `The quantity of product id ${id} has been updated successfully for unregistered user`, 
                updatedCart: sessionCart
            })

        }
        
        // check and validate if the user(buyer) has an existing cart;
        const existingUser = await User.findOne({username: username})

        if (!existingUser) return res.status(404).json({ 
            error: true, 
            message: "Sorry! The user does not exist" 
        })
    
        // check if the user(buyer) has an existing cart
        let cart = await Cart.findOne({buyer: existingUser._id})
        
        //check if the product is existing in the user(buyer) cart
        let existingCartProduct = cart.myCart.find((item) => item.product.equals(id))

        if (!existingCartProduct) return res.status(404).json({ 
            error: true, 
            message: "Sorry! The product does not exist this user cart",
            product: id,
            existingCart: cart
        })

        if (existingCartProduct && existingCartProduct.quantity == 1) return res.status(404).json({
            error: true, 
            message: "Sorry! The minimum quantity for the product is 1 " 
        })
        
        existingCartProduct.quantity --;

        // update the cart properties before saving 
        cart.numberOfProducts --;
        cart.subTotal = (+cart.subTotal - existingCartProduct.price).toFixed(2);
        const shippingCost = cart.subTotal > 500 ? 80 : 50;
        const VAT = cart.subTotal > 500 ? (7.5 / 100 ) * cart.subTotal : (5 / 100 ) * cart.subTotal;

        cart.shippingCost = shippingCost.toFixed(2);
        cart.vat = VAT.toFixed(2);
        cart.total = (cart.subTotal + cart.shippingCost + cart.vat).toFixed(2);
        await cart.save()

        return res.status(201).json({ 
            success: true,
            message: `The quantity of product id ${id} has been updated successfully`,
            updatedCart: cart
        })
    } 
    catch (err) {
        res.status(500).json({error: 'Internal server error', message: err.message})
    }
}

const deleteProductFromCart =  async(req, res) => {
        const {id} = req.params
        const {username} = req.query

    try {
        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({ 
            error: true, 
            message: "The product ID is invalid!"
        })

        const existingProduct = await Product.findById({_id: id})
        if (!existingProduct) return res.status(404).json({ 
            error: true, 
            message: "product does not exist" 
        }) 

        if (!username) { // If no username is provided, assume it's an unregistered user

            let sessionCart = req.session.cart;

            //check if the product is existing in the unregistered user cart
            let existingSessionCartProduct = sessionCart.myCart.find((item) => item.product === id)

            if (!existingSessionCartProduct) return res.status(404).json({ 
                error: true, 
                message: "Sorry! The product does not exist this unregisteredUser cart",
                product: id,
                existingCart: sessionCart
            })

            // Delete the product from the cart
            sessionCart.myCart = sessionCart.myCart.filter((item) => item.product !== id);

            // update the cart properties before saving 
            sessionCart.numberOfProducts -= existingSessionCartProduct.quantity
            sessionCart.subTotal = (+sessionCart.subTotal - (existingSessionCartProduct.price * existingSessionCartProduct.quantity)).toFixed(2);
            const shippingCost = sessionCart.subTotal === 0 ? 0 : sessionCart.subTotal > 500 ? 80 : 50;  
            const VAT = sessionCart.subTotal > 500 ? (7.5 / 100 ) * sessionCart.subTotal : (5 / 100 ) * sessionCart.subTotal;

            sessionCart.shippingCost = shippingCost;
            sessionCart.vat = VAT.toFixed(2);
            sessionCart.total = (+sessionCart.subTotal + +sessionCart.shippingCost + +sessionCart.vat).toFixed(2);

            // Save the session cart
            req.session.cart = sessionCart;

            return res.status(201).json({
                success: true, 
                message: `Product has been deleted from cart successfully for the unregistered user`, 
                deletedCartProduct: existingSessionCartProduct
            })
        }
        
        // check and validate if the user(buyer) has an existing cart;
        const existingUser = await User.findOne({username: username})
        if (!existingUser) return res.status(404).json({
            success: true, 
            message: `User does not exist`, 
        })
    
        // check if the user(buyer) has an existing cart
        let cart = await Cart.findOne({buyer: existingUser._id})

        //check if the product is existing in the user(buyer) cart
        let existingCartProduct = cart.myCart.find((item) => item.product.equals(id))
        if (!existingCartProduct) return res.status(404).json({ 
            error: true, 
            message: "Sorry! The product does not exist this user cart",
            product: id,
            existingCart: cart
        })

        // delete the product from the cart
        await Cart.findOneAndUpdate({_id: cart._id}, {$pull: {myCart: {product: id} }} )
        
        // update the cart properties
        cart.numberOfProducts -= existingCartProduct.quantity
        cart.subTotal = (cart.subTotal - (existingCartProduct.price * existingCartProduct.quantity)).toFixed(2)
        const shippingCost = cart.subTotal === 0 ? 0 : cart.subTotal > 500 ? 80 : 50
        const VAT = cart.subTotal > 500 ? (7.5 / 100 ) * cart.subTotal : (5 / 100 ) * cart.subTotal;

        cart.shippingCost = shippingCost;
        cart.vat = VAT.toFixed(2);
        cart.total = (cart.subTotal + cart.shippingCost + cart.vat).toFixed(2);
        await cart.save()

        return res.status(201).json({
            success: true, 
            message: `Product has been deleted from cart successfully`, 
            deletedCartProduct: existingCartProduct
        })
    } 
    catch (err) {
        res.status(500).json({error: 'Internal server error', message: err.message})
    }
}

const emptyCartProducts = async(req, res) => {
        const { username } = req.query;

    try {

        if (!username) { // If no username is provided, assume it's an unregistered user

            let sessionCart = req.session.cart;

            // Empty all the products from the cart and update the properties of session cart;
            sessionCart.myCart = [];
            sessionCart.numberOfProducts = 0,
            sessionCart.subTotal = 0;
            sessionCart.shippingCost = 0;
            sessionCart.vat = 0;
            sessionCart.total = 0;

            //save the session cart
            req.session.cart = sessionCart;

            return res.status(201).json({
                success: true, 
                message: 'Products emptied from cart successfully for unregistered user', 
                emptyCart: sessionCart
            })
        }

        const existingUser = await User.findOne({username: username})
        if (!existingUser) return res.status(404).json({ 
            error: true, 
            message: "Sorry! The user does not exist"
        })
        
        // check if the user(buyer) has an existing cart;
        let cart = await Cart.findOne({buyer: existingUser._id})
        const emptiedCart = await Cart.findByIdAndUpdate({_id: cart._id}, {$set: {myCart: [], numberOfProducts: 0, subTotal: 0, shippingCost: 0, vat: 0, total: 0}})

        return res.status(201).json({
            success: true, 
            message: 'Products has been emptied from cart',
            emptyCart: emptiedCart
        })
    } 
    catch (err) {
        res.status(500).json({error: 'Internal server error', message: err.message})
    }
} 

module.exports = {
    addProductToCart,
    fetchCartProducts,
    addQuantity,
    decrementQuantity,
    deleteProductFromCart,
    emptyCartProducts
}  
