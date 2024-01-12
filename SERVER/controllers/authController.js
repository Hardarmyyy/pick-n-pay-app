const bcrypt = require('bcrypt')
const JWT = require('jsonwebtoken')
const otpGenerator = require('otp-generator')
require('dotenv').config()
const {sendMail} = require('../Utilities/sendEmail')
const User = require('../models/UserModel')
const Cart = require('../models/CartModel')
const Otp = require('../models/OtpModel')
const {
    createResetPasswordToken, 
    createAccessToken, 
    createRefreshToken,
    createVerifyEmailToken
} = require('../Utilities/signJWT');
const {registerGoogleSheets} = require('../Utilities/googleSheets')  




const signUp = async (req, res) => {
        const cookies = req.cookies
        const refreshToken = cookies.refresh;
        const {username, email, password, userRole} = req.body 

    try {

        if (refreshToken) {
            res.clearCookie('refresh', refreshToken, {  httpOnly: true,  sameSite: "None", secure: true, maxAge: 24 * 60 * 60 * 1000 })
            // check if the existing user has a refresh token;
            const existingUser = await User.findOne({token: refreshToken});
            const newRefreshTokenArray = existingUser.token.filter((rt) => rt !== refreshToken)
            existingUser.token = [...newRefreshTokenArray];
            await existingUser.save()
        }

        if (!username || !email || !password || !userRole) return res.status(400).json({error: 'All fields are required'}) 

        //check username duplicate
        const registeredUsername = await User.findOne({username: username})

        if (registeredUsername) return res.status(409).json({error: 'Username already registered!'})
        // check email duplicate
        const registeredEmail = await User.findOne({email: email})

        if (registeredEmail) return res.status(409).json({error: 'Email already registered!'})
        
        // hash the user password
        const salt = await bcrypt.genSalt(Number(process.env.SALT))  
        const hashPassword = await bcrypt.hash(password, salt)

        // create a new user from the user model
        const user = new User({
            username: username, 
            email: email, 
            password: hashPassword,  
            roles: {
                    buyer: userRole === 'buyer' ? 'buyer' : null,
                    seller: userRole === 'seller' ? 'seller' : null,
                    admin: userRole === 'admin' ? 'admin' : null
                }
            })          

        // Save the new user to googlesheets and to the database
        await user.save()
        registerGoogleSheets(userRole, username, email)

        // Remove any existing OTP for the user in the database before generating a new OTP.
        await Otp.deleteOne({userId: user._id})

        // Generate a new OTP.
        const signupOtp = otpGenerator.generate(6, {digits: true, upperCaseAlphabets: false, lowerCaseAlphabets: false, specialChars: false})

        // Hash the created OTP before saving.
        const hashedOtp = await bcrypt.hash(signupOtp, salt)

        // Create and save the OTP.
        const newSignupOtp = new Otp({userId: user._id, otp: hashedOtp})
        await newSignupOtp.save() 

        // send a verification email otp using a library like Nodemailer here
        const emailToken = createVerifyEmailToken(user)
        const verifyEmailUrl = `${process.env.FRONTEND_URL}/verify-email?email=${email}&token=${emailToken}`;
        await sendMail(username, signupOtp, email, verifyEmailUrl, 'Email Verification OTP', 'verificationEmail.pug')  

        // Check if there is a session cart for unregistered users
        const sessionCart = req.session.cart;
        if (sessionCart) {
            // Associate the session cart with the newly registered user
            const newCart = new Cart({
                buyer: user._id, 
                myCart: sessionCart.myCart,
                numberOfProducts: sessionCart.numberOfProducts,
                subTotal: sessionCart.subTotal, 
                shippingCost: sessionCart.shippingCost, 
                vat: sessionCart.vat, 
                total: sessionCart.total
            })   

            await newCart.save()

            // Clear the session cart after associating with the user
            delete req.session.cart;
        }

        return res.status(201).json({
            message: `Account created successfully`,
            url: verifyEmailUrl,
            otp: signupOtp
        })
    }
    catch (err) {
        res.status(500).json({error: 'Internal server error', message: err.message}) 
    }
}

const verifyEmailToken = async (req, res) => {
    const cookies = req.cookies;
    const refreshToken = cookies?.refresh
    const { token, email } = req.query;

    try {

        if (refreshToken) {
            res.clearCookie('refresh', refreshToken, {  httpOnly: true,  sameSite: "None", secure: true, maxAge: 24 * 60 * 60 * 1000 })
            // check if the existing user has a refresh token;
            const existingUser = await User.findOne({token: refreshToken});
            const newRefreshTokenArray = existingUser.token.filter((rt) => rt !== refreshToken)
            existingUser.token = [...newRefreshTokenArray];
            await existingUser.save()
        }

        JWT.verify(
            token, 
            process.env.VERIFY_EMAIL_TOKEN_SECRET,
            async (err, decoded) => {
                if (err) return res.sendStatus(401)
                
                const existingUser = await User.findOne({email: decoded.email})
                if(existingUser.email !== email) return res.sendStatus(403)

                if (existingUser.verified) return res.status(200).json({verified: true})
                
                return res.status(200).json({
                    message: 'Email and token is valid',
                    email: email,
                    token: token
                })
        })
    } catch (err) {
        res.status(500).json({error: 'Internal server error', message: err.message})
    }
}

const emailVerification = async (req, res) =>  {
        const cookies = req.cookies;
        const refreshToken = cookies?.refresh
        const {signupOtp} = req.body
        const {token} = req.query  
    try {

        if (refreshToken) {
            res.clearCookie('refresh', refreshToken, {  httpOnly: true,  sameSite: "None", secure: true, maxAge: 24 * 60 * 60 * 1000 })
            // check if the existing user has a refresh token;
            const existingUser = await User.findOne({token: refreshToken});
            const newRefreshTokenArray = existingUser.token.filter((rt) => rt !== refreshToken)
            existingUser.token = [...newRefreshTokenArray];
            await existingUser.save()
        }
        
        if (!signupOtp) return res.status(400).json({error: 'OTP is required!'}) 

        JWT.verify( 
            token, 
            process.env.VERIFY_EMAIL_TOKEN_SECRET,
            async (err, decoded) => {
                if (err) return res.sendStatus(401)

                const unverifiedOtp = await Otp.findOne({userId: decoded.userId})  
        
                // compare otp before verifying email
                const isValidOtp = await bcrypt.compare(signupOtp, unverifiedOtp.otp)
                if (!isValidOtp) return res.status(400).json({error: 'Invalid OTP. Try again' })
                
                const existingUser = await User.findOne({email: decoded.email})
                existingUser.verified = true
                await existingUser.save()
        
                await Otp.findByIdAndDelete({_id: unverifiedOtp._id})
        
                return res.status(200).json({
                    message: `Email verification was successfull`,
                    verified: existingUser.verified
                })
        })
    }
    catch (err) {
        res.status(500).json({error: 'Internal server error', message: err.message})
    }
}

const signIn = async (req, res) => {
        const cookies = req.cookies
        const refreshToken = cookies.refresh;
        const {username, password} = req.body;

    try {

        if (refreshToken) {
            res.clearCookie('refresh', refreshToken, {  httpOnly: true,  sameSite: "None", secure: true, maxAge: 24 * 60 * 60 * 1000 })
            // check if the existing user has a refresh token;
            const existingUser = await User.findOne({token: refreshToken});
            const newRefreshTokenArray = existingUser.token.filter((rt) => rt !== refreshToken)
            existingUser.token = [...newRefreshTokenArray];
            await existingUser.save()
        }

        if (!username || !password) return res.status(400).json({error: 'All fields are required'})

        // check if user exists;
        const existingUser = await User.findOne({username: username})
        if (!existingUser) return res.status(400).json({error:'Invalid username'})

        // Verify the user's password.
        const isPasswordValid = await bcrypt.compare(password, existingUser.password)
        if (!isPasswordValid) return res.status(400).json({error: 'Incorrect password'})

        // Check if the user has verified their email account.
        if (!existingUser.verified) return res.status(403).json({error: "Please verify your email and try again"})

        let newRefreshTokenArray = !cookies?.refresh ? existingUser.token : existingUser.token.filter((rt) => rt !== cookies.refresh)

        // create a new accessToken for the user
        const accessToken = createAccessToken(existingUser)
        // create a new refreshToken for the user
        const newRefreshToken = createRefreshToken(existingUser._id)
        
        // update and save the existing user with a refresh token that can always be cross references when a user needs to login
        existingUser.token = [...newRefreshTokenArray, newRefreshToken]
        await existingUser.save()

        // Check if there is a session cart for existing user before login
        const sessionCart = req.session.cart;
        if (sessionCart) {
            // Associate the session cart with the existing user
            let existingCart = await Cart.findOne({buyer: existingUser._id})
            if (existingCart) {
                existingCart.myCart = [...existingCart.myCart, ...sessionCart.myCart]
                existingCart.numberOfProducts += sessionCart.numberOfProducts
                existingCart.subTotal += sessionCart.subTotal

                const shippingCost = existingCart.subTotal === 0 ? 0 : existingCart.subTotal > 500 ? 80 : 50;
                const VAT = existingCart.subTotal > 500 ? (7.5 / 100 ) * existingCart.subTotal : (5 / 100 ) * existingCart.subTotal;
        
                existingCart.shippingCost = shippingCost;
                existingCart.vat = VAT.toFixed(2);
                existingCart.total = (existingCart.subTotal + existingCart.shippingCost + existingCart.vat).toFixed(2);
                await existingCart.save()
            }
            else {
                // create a new cart for the existing user
                const newCart = new Cart({
                    buyer: existingUser._id, 
                    myCart: sessionCart.myCart,
                    numberOfProducts: sessionCart.numberOfProducts,
                    subTotal: sessionCart.subTotal, 
                    shippingCost: sessionCart.shippingCost, 
                    vat: sessionCart.vat, 
                    total: sessionCart.total
                })
    
                await newCart.save()
            }
            // Clear the session cart after associating with the existing user
            delete req.session.cart;
        }

        res.cookie('refresh', newRefreshToken,  { httpOnly: true, sameSite: "None", secure: true, maxAge: 24 * 60 * 60 * 1000 })
        return res.status(200).json({
            message: `Login Success`, 
            token: accessToken
        })
    }
    catch (err) {
        res.status(500).json({error: 'Internal server error', message: err.message})
    }
}

const forgotPassword = async (req, res) => {
        const cookies = req.cookies
        const refreshToken = cookies?.refresh
        const {email} = req.body

    try {
        if (refreshToken) {
            res.clearCookie('refresh', refreshToken, {  httpOnly: true,  sameSite: "None", secure: true, maxAge: 24 * 60 * 60 * 1000 })
            // check if the existing user has a refresh token;
            const existingUser = await User.findOne({token: refreshToken});
            const newRefreshTokenArray = existingUser.token.filter((rt) => rt !== refreshToken)
            existingUser.token = [...newRefreshTokenArray];
            await existingUser.save()
        }

        if (!email) return res.status(400).json({error: 'Please enter email address'})

        const existinguser = await User.findOne({email: email})
        if (!existinguser) return res.status(400).json({error: 'Kindly enter your registered email address'})

        // create a token to reset password 
        const resetToken = createResetPasswordToken(existinguser)

        // send a reset password email using a library like Nodemailer here
        const resetPasswordUrl = `${process.env.FRONTEND_URL}/reset-password?email=${email}&token=${resetToken}`;
        await sendMail(existinguser.username, '', email, resetPasswordUrl, 'RESET PASSWORD', 'resetEmail.pug')

        return res.status(200).json({
            message: `Reset link sent successfully`,
            url: `${resetPasswordUrl}`
        })
    }
    catch (err) {
        res.status(500).json({error: 'Internal server error', message: err.message})
    }
}

const verifyResetToken = async (req, res) => {
    const cookies = req.cookies;
    const refreshToken = cookies?.refresh
    const { token, email } = req.query;

    try {

        if (refreshToken) {
            res.clearCookie('refresh', refreshToken, {  httpOnly: true,  sameSite: "None", secure: true, maxAge: 24 * 60 * 60 * 1000 })
            // check if the existing user has a refresh token;
            const existingUser = await User.findOne({token: refreshToken});
            const newRefreshTokenArray = existingUser.token.filter((rt) => rt !== refreshToken)
            existingUser.token = [...newRefreshTokenArray];
            await existingUser.save()
        }

        JWT.verify(
            token, 
            process.env.RESET_PASSWORD_TOKEN_SECRET,
            async (err, decoded) => {
                if (err) return res.sendStatus(401)
                
                const existingUser = await User.findOne({email: decoded.email})
                if(existingUser.email !== email) return res.sendStatus(403)
                
                return res.json({
                    message: 'Reset token is valid',
                    resetToken: token
                })
        })
    } catch (err) {
        res.status(500).json({error: 'Internal server error', message: err.message})
    }
}

const resetPassword = async (req, res) => {
        const cookies = req.cookies;
        const refreshToken = cookies?.refresh
        const {token} = req.query
        const {password, confirmPassword} = req.body

    try {  
        
        if (refreshToken) {
            res.clearCookie('refresh', refreshToken, {  httpOnly: true,  sameSite: "None", secure: true, maxAge: 24 * 60 * 60 * 1000 })
            // check if the existing user has a refresh token;
            const existingUser = await User.findOne({token: refreshToken});
            const newRefreshTokenArray = existingUser.token.filter((rt) => rt !== refreshToken)
            existingUser.token = [...newRefreshTokenArray];
            await existingUser.save()
        }

        if (!password || !confirmPassword) return res.status(400).json({error: 'All fields are required'})

        JWT.verify(
            token, 
            process.env.RESET_PASSWORD_TOKEN_SECRET,
            async (err, decoded) => {
                if (err) return res.sendStatus(401)

                const existingUser = await User.findOne({email: decoded.email})
                
                // compare if the user password match
                if (password !== confirmPassword) return res.json({error: 'Password does not match'})

                // hash the user password
                const salt = await bcrypt.genSalt(Number(process.env.SALT))
                const hashedPassword = await bcrypt.hash(password, salt)
                
                // update and save the user password
                existingUser.password = hashedPassword
                await existingUser.save()

                res.status(200).json({
                    message: `Password reset was successfull`
                })
            })
    }
    catch (err) {
        res.status(500).json({error: 'Internal server error', message: err.message})
    }
}

const refreshToken = async (req, res) => {
        const cookies = req.cookies;
        const refreshToken = cookies.refresh;

    try {
        
        if (!refreshToken) return res.sendStatus(401); 
        // clear the current refreshToken;
        res.clearCookie('refresh', refreshToken, { httpOnly: true,  sameSite: "None", secure: true, maxAge: 24 * 60 * 60 * 1000 });

        // check if the existing user has a refresh token;
        const existingUser = await User.findOne({token: refreshToken});

        //Detected refreshToken reuse
        if (!existingUser) { 
            JWT.verify(
                refreshToken, 
                process.env.REFRESH_TOKEN_SECRET,
                async (err, decoded) =>{
                    if (err) return res.sendStatus(403);
                    const hackedUser = await User.findById({_id: decoded.userId});
                    hackedUser.token = []
                    await hackedUser.save();
                }
            )
        }

        const newRefreshTokenArray = existingUser.token.filter((rt) => rt !== refreshToken)

        JWT.verify(
            refreshToken, 
            process.env.REFRESH_TOKEN_SECRET,
            async (err, decoded) =>{
                if (err) {
                    // if the refresh token has expired, then
                    existingUser.token = [...newRefreshTokenArray];
                    await existingUser.save();
                    return res.sendStatus(403);
                }

                const currentUser = await User.findById({_id: decoded.userId});
                // create a new refreshToken for the user;
                const newRefreshToken = createRefreshToken(currentUser._id);

                // update and save the current user with the new RefreshToken;
                currentUser.token = [...newRefreshTokenArray, newRefreshToken];
                await currentUser.save()

                // send a newRefreshToken cookie to the client 
                res.cookie('refresh', newRefreshToken,  { httpOnly: true, sameSite: "None", secure: true,  maxAge: 24 * 60 * 60 * 1000 })

                // create a new access token for the current user
                const accessToken = createAccessToken(currentUser)

                res.status(200).json({
                    message: `Refresh user token`, 
                    token: accessToken
                })
            })
    }
    catch (err) {
        res.status(500).json({error: 'Internal server error', message: err.message})
    }
}

const logout = async (req, res) => {
        const cookies = req.cookies
        const refreshToken = cookies.refresh

    try {
        if (!refreshToken) return res.sendStatus(204) // No content 

        // check if the existing user has a refresh token
        const existingUser = await User.findOne({token: refreshToken})
        if (!existingUser) {
            // clear the refresh cookie
            res.clearCookie('refresh', refreshToken, {  httpOnly: true,  sameSite: "None", secure: true, maxAge: 24 * 60 * 60 * 1000 }) 
            return res.sendStatus(204)
        }
        
        // remove the refresh token from the user database
        const newRefreshTokenArray = existingUser.token.filter((rt) => rt !== refreshToken)

        existingUser.token = [...newRefreshTokenArray];
        await existingUser.save()

        // clear the refresh cookie
        res.clearCookie('refresh', refreshToken, { httpOnly: true,  sameSite: "None", secure: true, maxAge: 24 * 60 * 60 * 1000 }) 

        return res.status(200).json({
            message: 'logout successfull'
        })
    }
    catch (err) {
        res.status(500).json({error: 'Internal server error', message: err.message})
    }
}


module.exports = {
    signUp,
    verifyEmailToken,
    emailVerification,
    signIn,
    forgotPassword,
    verifyResetToken,
    resetPassword,
    refreshToken,
    logout
}