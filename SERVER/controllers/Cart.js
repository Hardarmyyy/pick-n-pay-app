const mongoose = require('mongoose'); // require mongoose to validate _id for buyers;
const Buyer = require('../models/BuyerModel');
const Seller = require('../models/SellerModel')
const Cart = require('../models/CartModel');
const Product = require('../models/ProductsModel');
const Shop = require('../models/ShopModel');



// create a add to cart controller for the buyer
exports.addItemToCart = async (req, res, next) => {
    try {
        // check if the buyer exist;
        const {username} = req.params
        const buyer = await Buyer.findOne({username: username})
        const seller = await Seller.findOne({username: username})
        if (seller) {
            return res.status(400).json({ error: "Sorry! Your user profile can't add items to cart" })
        }
        else {
                const { productid } = req.params
            if (!mongoose.Types.ObjectId.isValid(productid)) {
                return res.status(404).json({ error: "The product ID is invalid!" })
            }
                const product = await Product.findById({_id: productid}) 
            if (!product) {
                return res.status(400).send({ error: "product does not exist" }) 
            }
            // check if the product is in stock 
            if (product.stockQty < 1) {
                return res.status(400).send({ error: "product is out of stock" })
            }
            else {
                    const {price, quantity} = req.body
                    const newProduct = { productId: product._id, seller: product.sellerName, title: product.title, price: price * quantity, photo: [product.photo[0].filename], description: product.description, category: product.category, special: product.special, quantity: quantity};
                // check and validate if the buyer has an existing cart;
                    let cart = await Cart.findOne({buyer: username })
                if (cart) { // if there is an existing cart for the current buyer)
                            const existingItem = cart.myCart.find((item) => item.productId === productid)
                            if (existingItem) {
                                return res.status(400).json({ error: "product is existing in the cart already" })
                            }
                            else {
                                cart.myCart.push(newProduct)
                                // update the cart properties before saving
                                cart.subTotal = (cart.subTotal + price * quantity).toFixed(2);
                                const shippingCost = cart.subTotal > 500 ? 80 : 50;
                                const VAT = cart.subTotal > 500 ? (7.5 / 100 ) * cart.subTotal : (5 / 100 ) * cart.subTotal;

                                cart.shipping = shippingCost;
                                cart.vat = VAT.toFixed(2);
                                cart.total = (cart.subTotal + cart.shipping + cart.vat).toFixed(2);
                                await cart.save()
                                // update the product new stockQty by deducting the quantity ordered from the stockQty in the seller shop
                                let shop = await Shop.findOne({sellerName: product.sellerName})
                                const shopItem = shop.myShop.find((item) => item._id.equals(productid))
                                shopItem.stockQty -= quantity
                                await shop.save()
                                // update the product stockQty
                                await Product.findByIdAndUpdate({_id: productid}, {stockQty: product.stockQty - quantity})

                                return res.status(201).json({cart})
                            }
                }
                else { // if the buyer does not have a cart; then create a new cart for the buyer;
                        cart = new Cart({ buyer: username, myCart: [newProduct] })
                        // update the cart properties before saving 
                        cart.subTotal = price * quantity;
                        const shippingCost = cart.subTotal > 500 ? 80 : 50;
                        const VAT = cart.subTotal > 500 ? (7.5 / 100 ) * cart.subTotal : (5 / 100 ) * cart.subTotal;

                        cart.shipping = shippingCost;
                        cart.vat = VAT.toFixed(2);
                        cart.total = (cart.subTotal + cart.shipping + cart.vat).toFixed(2);
                        await cart.save()
                        // update the product new stockQty by deducting the quantity ordered from the stockQty in the seller shop
                        let shop = await Shop.findOne({sellerName: product.sellerName})
                        const shopItem = shop.myShop.find((item) => item._id.equals(productid))
                        shopItem.stockQty -= quantity
                        await shop.save()
                        // update the product stockQty
                        await Product.findByIdAndUpdate({_id: productid}, {stockQty: product.stockQty - quantity})

                        return res.status(201).json({cart});
                }
            }
        }
    } 
    catch (error) {    
        res.status(500).send({ error: error.message });
    }
};

// define a route for buyer to get all product inside a buyer's cart; NOTE: pass the buyer_id as the first params
exports.allCartItems =  async(req, res, next) => {
    
    try {
            const {username} = req.params
            const buyer = await Buyer.findOne({username: username})
            const seller = await Seller.findOne({seller: username})
        if (seller) {
            return res.status(400).json({ error: "Sorry! Your user profile can't add items to cart" })
        }
        else { 
            // check if the buyer has an existing cart;
                let cart = await Cart.findOne({buyer: username})
            if (!cart) {
                return res.status(404).json({ error: "The buyer doesn't have any product in the cart!" })
            }
            else { // if the user has an existing cart
                if (cart && cart.myCart.length > 0) {
                    // update the cart properties before saving 
                    cart.subTotal = cart.myCart.reduce((sum, item) => sum + item.price, 0).toFixed(2);
                    const shippingCost = cart.subTotal > 500 ? 80 : 50;
                    const VAT = cart.subTotal > 500 ? (7.5 / 100 ) * cart.subTotal : (5 / 100 ) * cart.subTotal;
    
                    cart.shipping = shippingCost;
                    cart.vat = VAT.toFixed(2);
                    cart.total = (cart.subTotal + cart.shipping + cart.vat).toFixed(2);
                    await cart.save()
                    return res.status(201).json({cart})
            
                }
                else if (cart && cart.myCart.length == 0){
                    const emptyCart = await Cart.findByIdAndUpdate({_id: cart.id}, {$set: {myCart: [], subTotal: 0, shipping: 0, vat: 0, total: 0}})
                    return res.status(201).json({emptyCart})
                }
            }
        }
    } 
    catch (error) {
        res.status(500).send({ error: error.message });
    }
}

// define a route for the buyer to increment the product quantity; NOTE: pass trhe buyer_id as the first params
exports.addQuantity =  async (req, res, next) => {
    try {
          // check and validate if the request _id for the product is a mongoDB id and if product exist;
        const { productid, username } = req.params
        if (!mongoose.Types.ObjectId.isValid(productid)) {
            return res.status(404).json({ error: "The product ID is invalid!" })
        }
            const product = await Product.findById({_id: productid})
        if (!product) {
            return res.status(401).send({ error: "product does not exist" })
        }
        // check if the product is in stock 
        if (product.stockQty < 1) {
            return res.status(400).send({ error: "product is out of stock" })
        }
            // check if the buyer exist
            const buyer = await Buyer.findOne({username: username})
        if (!buyer) {
            return res.status(400).json({ error: "buyer doesn't exist!" })
        }
        else if (buyer) {
              // check if the buyer has an existing cart
                let cart = await Cart.findOne({buyer: username})
            if (!cart) {
                return res.status(401).json({ error: "The buyer does't have any product in the cart" })
            }
            else {// if the buyer has an exisiting cart
                const existingItem = cart.myCart.find((item) => item.productId === productid)
                if (existingItem) {
                        existingItem.quantity += 1;
                        existingItem.price =  (product.price * existingItem.quantity).toFixed(2);

                        // update the cart properties before saving 
                        cart.subTotal = cart.myCart.reduce((sum, item) => sum + item.price, 0).toFixed(2);
                        const shippingCost = cart.subTotal > 500 ? 80 : 50;
                        const VAT = cart.subTotal > 500 ? (7.5 / 100 ) * cart.subTotal : (5 / 100 ) * cart.subTotal;
        
                        cart.shipping = shippingCost;
                        cart.vat = VAT.toFixed(2);
                        cart.total = (cart.subTotal + cart.shipping + cart.vat).toFixed(2);
                        await cart.save()

                        // update the product new stockQty by deducting the quantity ordered from the stockQty in the seller shop
                            let shop = await Shop.findOne({sellerName: product.sellerName})
                            const shopItem = shop.myShop.find((item) => item._id.equals(productid))
                            shopItem.stockQty -= 1
                            await shop.save()
                        // update the product stockQty
                            await Product.findByIdAndUpdate({_id: productid}, {stockQty: product.stockQty - 1})
                        return res.status(201).json({cart})
                }
                else if (!existingItem) {
                    return res.status(400).json({ error: "Sorry! The product is not in your cart" })
                }
            }
        }
    } 
    catch (error) {
        res.status(500).send({ error: error.message });
    }
}

// define a route for the buyer to decrement the product quantity; NOTE: pass trhe buyer_id as the first params
exports.decrementQuantity = async (req, res, next) => {
    try {
        // check and validate if the request _id for the product is a mongoDB id and if product exist;
            const { productid, username } = req.params
        if (!mongoose.Types.ObjectId.isValid(productid)) {
            return res.status(404).json({ error: "The product ID is invalid!" })
        }
            const product = await Product.findById({_id: productid})
        if (!product) {
            return res.status(401).send({ error: "product does not exist" })
        }
        // check if the buyer exist
            const buyer = await Buyer.findOne({username: username})
        if (!buyer) {
            return res.status(400).json({ error: "buyer doesn't exist!" })
        }
        else if (buyer){
            // check if the buyer has an existing cart
            let cart = await Cart.findOne({buyer: username})
            if (!cart) {
                return res.status(401).json({ error: "The buyer does't have any product in the cart" })
            }
            else { // check if the cart has an existing item
                const existingItem = cart.myCart.find((item) => item.productId === productid)
                if (existingItem && existingItem.quantity > 1) {
                    existingItem.quantity -= 1;
                    existingItem.price =  (product.price * existingItem.quantity).toFixed(2);

                    // update the cart properties before saving 
                    cart.subTotal = cart.myCart.reduce((sum, item) => sum + item.price, 0).toFixed(2);
                    const shippingCost = cart.subTotal > 500 ? 80 : 50;
                    const VAT = cart.subTotal > 500 ? (7.5 / 100 ) * cart.subTotal : (5 / 100 ) * cart.subTotal;
    
                    cart.shipping = shippingCost.toFixed(2);
                    cart.vat = VAT.toFixed(2);
                    cart.total = (cart.subTotal + cart.shipping + cart.vat).toFixed(2);
                    await cart.save()

                     // update the product new stockQty by adding the quantity back tp the stockQty in the seller shop
                    let shop = await Shop.findOne({sellerName: product.sellerName})
                    const shopItem = shop.myShop.find((item) => item._id.equals(productid))
                    shopItem.stockQty += 1
                    await shop.save()
                    // update the product stockQty
                    await Product.findByIdAndUpdate({_id: productid}, {stockQty: product.stockQty + 1})
                    return res.status(201).json({cart})
                }
                else if (existingItem && !(existingItem.quantity > 1)) {
                    return res.status(400).json({ error: "Sorry! The minimum quantity for the product is 1" })
                }
                else {
                    return res.status(400).json({ error: "Sorry! The product does not belong to your cart" })
                }
            }
        }
    } 
    catch (error) {
        res.status(500).send({ error: error.message });
    }
}

// define a route for buyer to remove a product from cart; NOTE: pass the buyer_id as the first params
exports.deleteItem =  async(req, res, next) => {
    try {
        // check and validate if the request _id for the product is a mongoDB id and if product exist;
        const { productid, username } = req.params
        if (!mongoose.Types.ObjectId.isValid(productid)) {
            return res.status(404).json({ error: "The product ID is invalid!" })
        }
            const product = await Product.findById({_id: productid})
        if (!product) {
            return res.status(401).send({ error: "product does not exist" })
        }
        // check and validate if the buyer exist;
            const buyer = await Buyer.findOne({username: username})
        if (!buyer) {
            return res.status(400).json({ error: "buyer doesn't exist!" })
        }
        else if (buyer) {
             // check if the buyer has an existing cart
            let cart = await Cart.findOne({buyer: username})
            if (!cart) {
                return res.status(401).json({ error: "The buyer does't have any product in the cart" })
            }
            else { // check if the product is existing in the cart;
                const existingItem = cart.myCart.find((item) => item.productId === productid)
                if (existingItem) { // remove the item from the cart
                        await Cart.findOneAndUpdate({_id: cart._id}, {$pull: {myCart: {productId: productid}}})
                        // update the product new stockQty by adding the quantity back tp the stockQty in the seller shop
                            let shop = await Shop.findOne({sellerName: product.sellerName})
                            const shopItem = shop.myShop.find((item) => item._id.equals(productid))
                            shopItem.stockQty += existingItem.quantity
                            await shop.save()
                        // update the product stockQty
                            await Product.findByIdAndUpdate({_id: productid}, {stockQty: product.stockQty + existingItem.quantity})
                        
                            cart.subTotal -= existingItem.price.toFixed(2)
                            const shippingCost = cart.subTotal === 0 ? 0 : cart.subTotal > 500 ? 80 : 50
                            const VAT = cart.subTotal > 500 ? (7.5 / 100 ) * cart.subTotal : (5 / 100 ) * cart.subTotal;

                            cart.shipping = shippingCost;
                            cart.vat = VAT.toFixed(2);
                            cart.total = (cart.subTotal + cart.shipping + cart.vat).toFixed(2);
                            await cart.save()

                        return res.status(201).json({removedItem: existingItem})
                }
                else if (!existingItem) {
                    return res.status(401).json({ error: "Sorry! The product is not in your cart"})
                }
            }

        }
    } 
    catch (error) {
        res.status(500).send({ error: error.message });
    }
}

//define a route for buyer to empty all product from cart; NOTE: pass the buyer_id as the first params
exports.emptyCart = async(req, res, next) => {
    try {
        // check and validate if the buyer exist;
            const {username} = req.params
            const buyer = await Buyer.findOne({username: username})
        if (!buyer) {
            return res.status(400).json({ error: "buyer doesn't exist!" })
        }
        else if (buyer) { 
                //check if the buyer has an existing cart
                let cart = await Cart.findOne({buyer: username})
                if (!cart) {
                    return res.status(401).json({ error: "The buyer does't have any product in the cart!" })
                }
                else {

                        await Promise.all(cart.myCart.map( async(product) => {
                            // update the product new stockQty by adding the quantity back to the stockQty in the seller shop
                                let shop = await Shop.findOne({sellerName: product.seller})
                                const shopItem = shop.myShop.find((item) => item._id.equals(product.productId))
                                shopItem.stockQty += product.quantity

                            // update the product stockQty by adding it back to the product qty
                                const allProduct = await Product.find({})
                                await Promise.all(allProduct.map( async(pro) => {
                                    if (pro._id.equals(product.productId)) {
                                        await Product.findByIdAndUpdate({_id: product.productId}, {stockQty: pro.stockQty + product.quantity})
                                    }
                                })) 
                                
                                await shop.save()

                            return {productId: product.productId, seller: product.sellerName, title: product.title, price: product.price, quantity: product.quantity}
                        }))

                        const emptiedCart = await Cart.findByIdAndUpdate({_id: cart.id}, {$set: {myCart: [], subTotal: 0, shipping: 0, vat: 0, total: 0}})
                        return res.status(201).json({emptiedCart})
                    
                } 
        }
    } 
    catch (error) {
        res.status(500).send({ error: error.message });
    }
}
