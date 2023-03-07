const joi = require('joi');

module.exports.registerSchema = joi.object({
    email : joi.string().required().email(),
    name : joi.string().min(3).max(20).required(),
    password: joi.string().required()

})


module.exports.loginSchema = joi.object({
    email : joi.string().required().email(),
    password : joi.string().required()
})