const Joi = require('joi');
const passwordComplexity = require('joi-password-complexity');

exports.validateSignin = (data) => {
    const schema = Joi.object({
        username: Joi.string().required().label('username'),
        password: Joi.string().required().label('password')
    })
    return schema.validate(data)
}

exports.validateSignup = (data) => {
    const schema = Joi.object({
        usertype: Joi.string().required().label('usertype'),
        username: Joi.string().required().label('username'),
        email: Joi.string().email().required().label('email'),
        password: passwordComplexity().required().label('password'), 
    })
    return schema.validate(data)
}