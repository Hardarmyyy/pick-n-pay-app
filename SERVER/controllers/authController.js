const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const JWT = require('jsonwebtoken')
const otpGenerator = require('otp-generator')
const {addMinutes, isAfter} = require('date-fns')
require('dotenv').config()
const User = require('../models/UserModel')
const Otp = require('../models/OtpModel')
const {
    createVerifyEmailToken,
    createOtpToken, 
    createResetPasswordToken, 
    createAccessToken, 
    createRefreshToken
} = require('../Utilities/signJWT'); 



const signUp = async (req, res) => {
        const {username, email, password, usertype} = req.body

    try {
        if (!username || !email || !password || !usertype) return res.status(400).json({error: 'All fields are required'}) 

        //check username duplicate
        const registeredUsername = await User.findOne({username: username})

        if (registeredUsername) return res.json({
            error: true, 
            message: 'Username already registered! kindly choose a different username'
        })
        // check email duplicate
        const registeredEmail = await User.findOne({email: email})

        if (registeredEmail) return res.json({
            error: true, 
            message: 'Email already registered! kindly choose a different Email'
        })
        
        // hash the user password
        const salt = await bcrypt.genSalt(Number(process.env.SALT))  
        const hashPassword = await bcrypt.hash(password, salt)

        // create a new user from the user model
        const user = new User({
            username: username, 
            email: email, 
            password: hashPassword,
            roles: {
                    buyer: usertype === 'buyer' ? 'buyer' : null,
                    seller: usertype === 'seller' ? 'seller' : null,
                    admin: usertype === 'admin' ? 'admin' : null
                }
            })

        // Save the new user to the database
        await user.save()

        const emailToken = createVerifyEmailToken(user._id)
        // You can send a verification email using a library like Nodemailer here
        res.status(200).json({
            success: true, 
            message: `Verification email has been sent to ${user.email} successfully`, 
            token: emailToken 
        })
    }
    catch (err) {
        res.status(500).json({error: 'Internal server error', message: err.message}) 
    }
}

const emailVerification = async (req, res) =>  {
        const {email} = req.query
    try {
        if (!email) return res.status(404).json({
            error: true, 
            message: "Invalid token"
        });

        JWT.verify(
            email, 
            process.env.VERIFY_EMAIL_TOKEN_SECRET,
            async (err, decoded) => {
                if (err) return res.sendStatus(403)

                const isVerified = await User.findById({_id: decoded.userId})
                if (!isVerified)  return res.json({
                    error: true, 
                    message: 'user not found'
                })

                isVerified.verified = true
                await isVerified.save()

                res.status(200).json({
                    success: true, 
                    message: `Congratulations ${isVerified.username}, your email has been verified`
                })
            })
    }
    catch (err) {
        res.status(500).json({error: 'Internal server error', message: err.message})
    }
}

const signIn = async (req, res) => {
        const {username, password} = req.body;
    try {
        if (!username || !password) return res.status(404).json({
            error: true, 
            message: 'All fields are required'
        })

        // check if user exists;
        const existingUser = await User.findOne({username: username})
        if (!existingUser) return res.status(404).json({
            error: true, 
            message: 'Incorrect username or password'
        })

        // Verify the user's password.
        const isPasswordValid = await bcrypt.compare(password, existingUser.password)
        if (!isPasswordValid) return res.status(404).json({
            error: true, 
            message: 'Incorrect password'
        })

        // Check if the user has verified their email account.
        if (!existingUser.verified) return res.status(404).json({
            error: true, 
            message: "Please verify your email and try again"
        })

        // Remove any existing OTP for the user in the database before generating a new OTP.
        await Otp.deleteOne({userId: existingUser._id})

        // Generate a new OTP.
        const otp = otpGenerator.generate(6, {digits: true, upperCaseAlphabets: false, lowerCaseAlphabets: false, specialChars: false})

        // Hash the created OTP before saving.
        const salt = await bcrypt.genSalt(Number(process.env.SALT))
        const hashedOtp = await bcrypt.hash(otp, salt)

        // Create and save the OTP.
        const newOtp = new Otp({userId: existingUser._id, otp: hashedOtp})
        await newOtp.save() 

        // Create a token to confirm the OTP.
        const otpToken = createOtpToken(existingUser._id)

        // You can send an OTP verification email using a library like Nodemailer here.
        return res.status(200).json({
            success: true, 
            message: `${otp} has been sent to ${existingUser.username} successfully`, 
            token: otpToken
        });   
    }
    catch (err) {
        res.status(500).json({error: 'Internal server error', message: err.message})
    }
}

const otpVerification = async (req, res) => {
            const cookies = req.cookies
            const refreshToken = cookies.refresh;
            const {verify} = req.query
            const {otp} = req.body
    try {   
        if (!verify) return res.status(404).json({
            error: true, 
            message: "Invalid token"
        });

        JWT.verify(
            verify, 
            process.env.OTP_TOKEN_SECRET,
            async (err, decoded) => {
                if (err) return res.sendStatus(403)

                const unverifiedOtp = await Otp.findOne({userId: decoded.userId})
                const existingUser = await User.findById({_id: decoded.userId})

                if (!unverifiedOtp) return res.status(404).json({
                    error: true,
                    message: 'Invalid! kindly send otp to login'
                })

                if (!otp) return res.status(404).json({
                    error: true, 
                    message: 'Otp is required'
                })

                // confirm otp before sign in
                const isValidOtp = await bcrypt.compare(otp, unverifiedOtp.otp)

                if (!isValidOtp) return res.status(404).json({
                    error: true, 
                    message: 'Invalid otp'
                })

                // check if otp is still valid and not expired before sign in
                const otpCreatedAt = unverifiedOtp.createdAt
                const checkIsValid = addMinutes(otpCreatedAt, 1)
                const currentTime = new Date()
                if (isAfter(currentTime, checkIsValid)) {
                        // delete otp from the database
                        await Otp.deleteOne({userId: unverifiedOtp.userId})
                        return res.status(404).json({
                            error: true, 
                            message: 'Otp has expired. Kindly resend otp to login'
                        })
                } 
                
                // delete otp from the database
                await Otp.deleteOne({userId: unverifiedOtp.userId})

                let newRefreshTokenArray = !cookies?.refresh ? existingUser.token : existingUser.token.filter((rt) => rt !== cookies.refresh)

                // create a new accessToken for the user
                const accessToken = createAccessToken(existingUser)
                // create a new refreshToken for the user
                const newRefreshToken = createRefreshToken(existingUser._id)
                
                // update and save the existing user with a refresh token that can always be cross references when a user needs to login
                existingUser.token = [...newRefreshTokenArray, newRefreshToken]
                await existingUser.save()

                // expiry: 24 hours // secure: true // sameSite: "None" cross-site cookie (after production)) 
                res.cookie('refresh', newRefreshToken,  { httpOnly: true, sameSite: "None", maxAge: 24 * 60 * 60 * 1000 })
                res.status(200).json({
                    success: true, 
                    message: `${existingUser.username} successfully logged in`, 
                    token: accessToken
                })
            })
    }
    catch (err) {
        res.status(500).json({error: 'Internal server error', message: err.message})
    }
}

const resendOtpVerification = async (req, res) => {
        const {verify} = req.query

    try {   
        if (!verify) return res.status(404).json({
            error: true, 
            message: "Invalid token"
        });

        JWT.verify(
            verify, 
            process.env.OTP_TOKEN_SECRET,
            async (err, decoded) => {

                if (err) return res.sendStatus(403)

                const unverifiedOtp = await Otp.findOne({userId: decoded.userId})
                // remove existing user otp in the database before generating a new otp
                if (unverifiedOtp) {
                    await Otp.deleteOne({userId: unverifiedOtp.userId})
                }

                const existingUser = await User.findById({_id: decoded.userId})
                    // create a new user otp
                const otp = otpGenerator.generate(6, {digits: true, upperCaseAlphabets: false, lowerCaseAlphabets: false, specialChars: false});
                // hash the new otp before saving to databse
                const salt = await bcrypt.genSalt(Number(process.env.SALT))
                const hashedOtp = await bcrypt.hash(otp, salt)
                // create and save the otp
                const newOtp = new Otp({userId: existingUser._id, otp: hashedOtp})
                await newOtp.save() 

                res.status(200).json({
                    success: true, 
                    message: `${otp} has been re-sent to ${existingUser.username} successfully`
                })
            })
    }
    catch (err) {
        res.status(500).json({error: 'Internal server error', message: err.message})
    }
}

const forgotPassword = async (req, res) => {
        const {email} = req.body

    try {
        if (!email) return res.status(404).json({
            error: true, 
            message: 'Please enter your registered email address'
        })

        const existinguser = await User.findOne({email: email})
        if (!existinguser) return res.json({
            error: true, 
            message: 'Email is not registered. Kindly enter your registered email address'
        })

        // create a token to reset password 
        const resetToken = createResetPasswordToken(existinguser._id)
        // can perform other logic like using nodemailer to send email reset link for user password reset
        res.status(200).json({
            success: true, 
            message: `Reset link has been sent to your email address ${existinguser.email}`,
            resetToken: resetToken
        })
    }
    catch (err) {
        res.status(500).json({error: 'Internal server error', message: err.message})
    }
}

const resetPassword = async (req, res) => {
        const {token} = req.query
        const {password, confirmPassword} = req.body

    try {   
        if (!token) return res.status(404).json({
            error: true, 
            message: 'Invalid token request'
        })

        JWT.verify(
            token, 
            process.env.RESET_PASSWORD_TOKEN_SECRET,
            async (err, decoded) => {
                if (err) return res.sendStatus(403)

                const existingUser = await User.findById({_id: decoded.userId})
                if (!existingUser) return res.json({
                    error: true, 
                    message: 'User not found'
                })
                
                if (!password || !confirmPassword) return res.status(404).json({
                    error: true, 
                    message: 'All fields are required'
                })
                // compare if the user password match
                if (password !== confirmPassword) return res.status(404).json({
                    error: true, 
                    message: 'Password does not match'
                })

                // hash the user password
                const salt = await bcrypt.genSalt(Number(process.env.SALT))
                const hashedPassword = await bcrypt.hash(password, salt)
                
                // update and save the user password
                existingUser.password = hashedPassword
                await existingUser.save()

                res.status(200).json({
                    success: true, 
                    message: `${existingUser.username}, your password has been updated successfully`
                })
            })
        
    }
    catch (err) {
        res.status(500).json({error: 'Internal server error', message: err.message})
    }
}

const refreshToken = async (req, res) => {
        const cookies = req.cookies;
        if (!cookies?.refresh) return res.sendStatus(401); 

    try {
        const refreshToken = cookies.refresh
        
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

        // verify the refresh token
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
                res.cookie('refresh', newRefreshToken,  { httpOnly: true, sameSite: "None",  maxAge: 24 * 60 * 60 * 1000 })

                // create a new access token for the current user
                const accessToken = createAccessToken(currentUser)

                res.status(200).json({
                    success: true, 
                    message: `${existingUser.username} refreshed a page`, 
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
        if (!cookies?.refresh) return res.sendStatus(204) // No content 

    try {
        
        const refreshToken = cookies.refresh
        // check if the existing user has a refresh token
        const existingUser = await User.findOne({token: refreshToken})
        if (!existingUser) {
            // clear the refresh cookie
            // expiry: 24 hours // secure: true (after production))
            res.clearCookie('refresh', refreshToken, {  httpOnly: true,  sameSite: "None", secure: true, maxAge: 24 * 60 * 60 * 1000 }) 
            return res.sendStatus(204)
        }
        
         // remove the refresh token from the user database
        const newRefreshTokenArray = existingUser.token.filter((rt) => rt !== refreshToken)

        existingUser.token = [...newRefreshTokenArray];
        await existingUser.save()

        // clear the refresh cookie
        // expiry: 24 hours // secure: true // sameSite: "None" cross-site cookie (after production))  
        res.clearCookie('refresh', refreshToken, { httpOnly: true,  sameSite: "None", secure: true, maxAge: 24 * 60 * 60 * 1000 }) 

        res.status(200).json({
            success: true, 
            message: 'logout successfull'
        })
    }
    catch (err) {
        res.status(500).json({error: 'Internal server error', message: err.message})
    }
}


module.exports = {
    signUp,
    emailVerification,
    signIn,
    otpVerification,
    resendOtpVerification,
    forgotPassword,
    resetPassword,
    refreshToken,
    logout
}