const mongoose = require('mongoose'); // require mongoose to validate _id for users;
const Buyer = require('../models/BuyerModel')
const Seller = require('../models/SellerModel')
const Shop = require('../models/ShopModel')
const Product = require('../models/ProductsModel')
const bcrypt = require('bcrypt'); // require bcrypt to hash user password;
const jwt = require('jsonwebtoken'); // require json web token;

const createToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET, { expiresIn: '150s' }) 
}


// register user
exports.signup = async (req, res, next) => { 
    try {

        const {usertype, username, email, password} = req.body
        if (!usertype || !username || !email || !password) {
            return res.status(401).json({ error: "All fields are required."})
        }
        // check if username is already registered;
        const buyerAlreadyRegistered = await Buyer.findOne({username: username});
        const sellerAlreadyRegistered = await Seller.findOne({username: username});
        if (buyerAlreadyRegistered || sellerAlreadyRegistered) { 
            return res.status(409).json({ error: "Username is taken. Choose another one."})
        }
        // check if email is already registered
        const buyerEmailAlreadyRegistered = await Buyer.findOne({email: email})
        const sellerEmailAlreadyRegistered = await Seller.findOne({email: email})
        if (buyerEmailAlreadyRegistered || sellerEmailAlreadyRegistered) { 
            return res.status(409).json({ error: "This email is already registered. Choose another one" }) 
        }
        // check the length of username
        if (username.length < 8) {
            return res.status(404).json({ error: "username must be at least 8 characters long" })
        }
        // check the length of password
        if (password.length < 8) {
            return res.status(404).json({ error: "password must be at least 8 characters long" })
        }
         // check if the password contains a symbol
        const passwordRegexSymbol = /^(?=.*[.!@#$%^&*])[a-zA-Z0-9.!@#$%^&*]{8,}$/;
        if (!passwordRegexSymbol.test(password)) {
            return res.status(404).json({ error: "password must contain at least one symbol!" })
        }
        // check if the password contains an upper case letter
            const passwordRegexUpperCase = /^(?=.*[A-Z])[a-zA-Z0-9.!@#$%^&*]{8,}$/;
        if (!passwordRegexUpperCase.test(password)) {
            return res.status(404).json({ error: "password must contain at least one uppercased letter!" })
        }
        // check if the password contains a number character
        const passwordRegexNumber = /^(?=.*[0-9])[a-zA-Z0-9.!@#$%^&*]{8,}$/;
        if (!passwordRegexNumber.test(password)) {
            return res.status(404).json({ error: "password must contain at least one number!" })
        }
        // if password passed all conditions above, create and hash the password;
        const salt = await bcrypt.genSalt(Number(process.env.SALT))
        const hashedPassword = await bcrypt.hash(password, salt)
        // check the usertype of the req body to know what model to create for the new user
        if (usertype === 'buyer') {
            const buyer = new Buyer({usertype, username, email, password: hashedPassword})
            await buyer.save();
             // create token for buyer;
            const token = createToken(buyer._id);
            return res.status(201).json({ token, buyer });
        }
        else if (usertype === 'seller') {
            const seller = new Seller({usertype, username, email, password: hashedPassword})
            await seller.save()
             // create token for buyer;
            const token = createToken(seller._id);
            return res.status(201).json({ token, seller });
        }
    } 
    catch (error) {
        res.status(500).send({ error: error.message });
    }
}

//login user
exports.login = async (req, res, next) => {
    try {    

        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(401).json({ error: "username and password is required."})
        }

        // findUser = await User.findOne({$or: [{ username: username}, { email: email}] }); // this check can be used when finding email or username
            const findBuyer = await Buyer.findOne({ username: username})
            const findSeller = await Seller.findOne({username: username})

        if (!findBuyer && !findSeller) { // if there is no buyer or seller
            return res.status(409).json({ error: "Incorrect username. Enter a valid username"})
        }
        else {
            if (findBuyer) { // if the current user is a buyer
                const verifyPassword = await bcrypt.compare(password, findBuyer.password)

                if (!verifyPassword) {
                    return res.status(409).json({ error: "Incorrect password. please try again"})
                }
                else {
                     // create token for user;
                    const token = createToken(findBuyer._id);

                    return res.status(201).json({ token, usertype: findBuyer.usertype,  username: findBuyer.username,  
                    cartProducts: findBuyer.cart, favourites: findBuyer.favourites, orders: findBuyer.orders });
                    }
            } 
            else if (findSeller) { // if the current user is a seller
                const verifyPassword = await bcrypt.compare(password, findSeller.password)

                if (!verifyPassword) {
                    return res.status(409).json({ error: "Incorrect password. please try again"})
                }
                else {
                    // create token for user;
                    const token = createToken(findSeller._id);

                    return res.status(201).json({ token, usertype: findSeller.usertype,  username: findSeller.username, shop: findSeller.shop, order: findSeller.order });
                    }
                }
            }
    } 
    catch (error) {
        res.status(500).json({ error: error.message })
    }
}

//get all users
exports.allUser = async (req, res, next) => {
    try {
        const buyers = await Buyer.find({}).sort({date_added: -1}).select('-password').lean()
        const sellers = await Seller.find({}).sort({date_added: -1}).select('-password').lean()
        // const users = buyers.concat(sellers).sort({date_added: -1})
        if (!buyers.length && !sellers.length) {
            return res.status(404).json({error: "users not found"})
        }
        const allUsers = {buyers, sellers}
        return res.status(200).json({allUsers});
    }
    catch (error) {
        res.status(500).send({error: error.message});
    }
}

//get a user
exports.getUser = async (req, res, next) => {
    try {
        const {username} = req.params
        // chech if the req uest username exist in the database;
        const buyer = await Buyer.findOne({username: username})
        const seller = await Seller.findOne({username: username})
        if (!buyer && !seller) {
            return res.status(400).json({ error: "user doesn't exist!" })
        }
        else {
            if (buyer) {
                return res.status(200).json({username: buyer.username, email: buyer.email})
            }
            else if (seller) {
                return res.status(200).json({username: seller.username, email: seller.email})
            }
        }
    } 
    catch (error) {
        res.status(500).send({error: error.message});
    }
}

//delete a user
exports.deleteUser = async (req, res, next) => {
	try {
        // check and validate if the _id is a mongoDB id;
        const {username} = req.params
        const buyer = await Buyer.findOne({ username: username })
        const seller = await Seller.findOne({ username: username })
        
        if (!buyer && !seller) {
            return res.status(400).json({ error: "user doesn't exist!" })
        }
        else {
            if (buyer) {
                const deletedUser = await Buyer.findOneAndDelete({username: username})
                return res.status(200).json({deletedBuyer: deletedUser})
            }
            else if (seller) {
                // check if the seller has an existing shop with products
                const sellerShop = await Shop.findOne({sellerName: username})
                if (!sellerShop) {
                    const deletedUser = await Seller.findOneAndDelete({username: username})
                    return res.status(200).json({deletedSeller: deletedUser})
                }
                else if (sellerShop) { // if the seller has an exisiting shop with products;
                // delete the products from the seller shop
                    const shopProducts = await Promise.all(sellerShop.myShop.map(async(item) => {
                        const deleteExisitngProduct = await Product.findByIdAndDelete({_id: item._id})
                        return {deletedShopItems: deleteExisitngProduct}
                    }))
                // delete the shop
                    const deletedShop = await Shop.findOneAndDelete({sellerName: username})
                // delete the seller information
                    const deletedUser = await Seller.findOneAndDelete({username: username})
                    return res.status(200).json({deletedShopProducts: shopProducts, removedShop: deletedShop, deletedSeller: deletedUser})
                }
            }
        }
	} 
    catch (error) {
        res.status(500).send({error: error.message});
    }
}

//update a user password
exports.updateUserPassword = async (req, res, next) => {
    try {
            const {username} = req.params
        // check and find if the user exist
            let buyer = await Buyer.findOne({username: username})
            let seller = await Seller.findOne({username: username})
        if (!buyer && !seller) {
            return res.status(400).json({ error: "user doesn't exist!" })
        }
        else {
                const { currentpassword, newpassword, confirmnewpassword} = req.body;

            if (buyer) {
                if (!currentpassword || !newpassword || !confirmnewpassword) {
                    return res.status(404).json({ error: "All fields are required!" })
                }
                // Check if the provided current password matches the user's current password
                const isPasswordMatch = await bcrypt.compare(currentpassword, buyer.password);
                if (!isPasswordMatch) {
                    return res.status(401).json({ error: 'Incorrect current password' });
                }
                // check if the new password matches the confirm new password
                if (newpassword !== confirmnewpassword) {
                    return res.status(401).json({ error: 'new password and confirm new password does not match'});
                }
                // check if the new password is more than 8 characters
                if (newpassword.length < 8) {
                    return res.status(404).json({ error: "password must be at least 8 characters long"})
                }
                // check if the new password includes a symbol
                    const passwordRegexSymbol = /^(?=.*[.!@#$%^&*])[a-zA-Z0-9.!@#$%^&*]{8,}$/;
                if (!passwordRegexSymbol.test(newpassword)) {
                    return res.status(404).json({ error: "password must contain at least one symbol!" })
                }
                // check if the new password includes an upper case letter
                    const passwordRegexUpperCase = /^(?=.*[A-Z])[a-zA-Z0-9.!@#$%^&*]{8,}$/;
                if (!passwordRegexUpperCase.test(newpassword)) {
                    return res.status(404).json({ error: "password must contain at least one uppercased letter!" })
                }
                // check if the new password includes a number character
                const passwordRegexNumber = /^(?=.*[0-9])[a-zA-Z0-9.!@#$%^&*]{8,}$/;
                if (!passwordRegexNumber.test(newpassword)) {
                    return res.status(404).json({ error: "password must contain at least one number!" })
                }
                // Hash the new password
                const salt = await bcrypt.genSalt(Number(process.env.SALT));
                const newHashedPassword = await bcrypt.hash(newpassword, salt);
                // update the buyer password
                buyer = await Buyer.findOneAndUpdate({ username: username }, { password: newHashedPassword })
                res.status(200).json({ updatedBuyerPassword: buyer })
            }
            else if (seller) {
                if (!currentpassword || !newpassword || !confirmnewpassword) {
                    return res.status(404).json({ error: "All fields are required!" })
                }
                // Check if the provided current password matches the user's current password
                const isPasswordMatch = await bcrypt.compare(currentpassword, seller.password);
                if (!isPasswordMatch) {
                    return res.status(401).json({ error: 'Incorrect current password' });
                }
                // check if the new password matches the confirm new password
                if (newpassword !== confirmnewpassword) {
                    return res.status(401).json({ error: 'new password and confirm new password does not match'});
                }
                // check if the new password is more than 8 characters
                if (newpassword.length < 8) {
                    return res.status(404).json({ error: "password must be at least 8 characters long"})
                }
                // check if the new password includes a symbol
                    const passwordRegexSymbol = /^(?=.*[.!@#$%^&*])[a-zA-Z0-9.!@#$%^&*]{8,}$/;
                if (!passwordRegexSymbol.test(newpassword)) {
                    return res.status(404).json({ error: "password must contain at least one symbol!" })
                }
                // check if the new password includes an upper case letter
                    const passwordRegexUpperCase = /^(?=.*[A-Z])[a-zA-Z0-9.!@#$%^&*]{8,}$/;
                if (!passwordRegexUpperCase.test(newpassword)) {
                    return res.status(404).json({ error: "password must contain at least one uppercased letter!" })
                }
                // check if the new password includes a number character
                const passwordRegexNumber = /^(?=.*[0-9])[a-zA-Z0-9.!@#$%^&*]{8,}$/;
                if (!passwordRegexNumber.test(newpassword)) {
                    return res.status(404).json({ error: "password must contain at least one number!" })
                }
                // Hash the new password
                const salt = await bcrypt.genSalt(Number(process.env.SALT));
                const newHashedPassword = await bcrypt.hash(newpassword, salt);
                // update the buyer password
                seller = await Seller.findOneAndUpdate({ username: username }, { password: newHashedPassword })
                res.status(200).json({ updatedSellerPassword: seller })
            }
        }
	} 
    catch (error) {
        res.status(500).send({error: error.message});
    }
} 

//update a user info
exports.updateUser = async (req, res, next) => {
    try {
            const { currentusername } = req.params
        // check and validate if the user exists;
            const buyer = await Buyer.findOne({username: currentusername})
            const seller = await Seller.findOne({username: currentusername})

        if (!buyer && !seller) {
            return res.status(400).json({ error: "user doesn't exist!" })
        }
        else {
                const {username, email } = req.body;
            if (buyer) {
                    if (!username || !email) {
                        return res.status(400).json({ error: "All fields are required!" })
                    }
                    if (username.length < 8 ) {
                        return res.status(404).json({ error: "username must be at least 8 characters long" })
                    }
                    // check for username duplicate
                    const registeredSellerUsername = await Seller.findOne({ username: username });
                    const registeredBuyerUsername = await Buyer.findOne({ username: username });
                    if (registeredSellerUsername && registeredSellerUsername?._id.toString() !== buyer._id.toString() || registeredBuyerUsername &&       registeredBuyerUsername?._id.toString() !== buyer._id.toString()) {
                        return res.status(409).json({ error: "Username is taken. Choose another one."})
                    }
                    // check for email duplicate
                    const registeredSellerEmail = await Seller.findOne({ email: email });
                    const registeredBuyerEmail = await Buyer.findOne({ email: email });
                    if (registeredSellerEmail && registeredSellerEmail?._id.toString() !== buyer._id.toString() ||    registeredBuyerEmail &&  registeredBuyerEmail?._id.toString() !== buyer._id.toString()) {
                        return res.status(409).json({ error: "Email is taken. Choose another one."})
                    }
                    // if all the condition are passed; update the user information;
                    buyer.username = username,
                    buyer.email = email

                    await buyer.save()
                    res.status(201).json({updatedBuyer: buyer})
            }
            else if (seller)  {
                if (!username || !email) {
                    return res.status(400).json({ error: "All fields are required!" })
                }
                if (username.length < 8 ) {
                    return res.status(404).json({ error: "username must be at least 8 characters long" })
                }
                // check for username duplicate
                    const registeredSellerUsername = await Seller.findOne({ username: username });
                    const registeredBuyerUsername = await Buyer.findOne({ username: username });

                if (registeredSellerUsername && registeredSellerUsername?._id.toString() !== seller._id.toString() || registeredBuyerUsername &&           registeredBuyerUsername?._id.toString() !== seller._id.toString()) {
                    return res.status(409).json({ error: "Username is taken. Choose another one."})
                }
                // check for email duplicate
                    const registeredSellerEmail = await Seller.findOne({ email: email });
                    const registeredBuyerEmail = await Buyer.findOne({ email: email });
                if (registeredSellerEmail && registeredSellerEmail?._id.toString() !== seller._id.toString() ||    registeredBuyerEmail &&             registeredBuyerEmail?._id.toString() !== seller._id.toString()) {
                    return res.status(409).json({ error: "Email is taken. Choose another one."})
                }
                // if all the condition are passed; update the user information;
                    seller.username = username,
                    seller.email = email

                    await seller.save()
                    res.status(201).json({updatedSeller: seller})
            }   
        }
    }
    catch (error) {
        res.status(500).send({error: error.message});
    }
}




