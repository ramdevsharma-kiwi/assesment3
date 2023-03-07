const status = require('../constant/httpStatusCodes')
const validator = require("../validations/validation")
const UserModel = require("../models/user")
const bcrypt = require('bcryptjs')
const jwt = require("jsonwebtoken")
const secretCode = process.env.SECRET_CODE;


module.exports.login = async(req,res)=>{
    const bool = validator.loginSchema.validate({
        email: req.body.email,
        password: req.body.password
    });
    if (bool.error != undefined) {
        res.send(bool.error.details[0].message);
    }
    else {
        try {
            const existingUser = await UserModel.findOne({ email: req.body.email })
            if (!existingUser) {
                return res.status(400).json({ message: "Invalid credential" })
            }
            else {
                const matchPassword = await bcrypt.compare(req.body.password, existingUser.password);

                if (!matchPassword) {
                    return res.status(400).json({ message: "Invalid Credentials" })
                }
                else {
                    if (existingUser.role != 2) {
                        return res.status(400).json({ message: "Invalid Credentials" })
                    }
                    else {
                        const token = 'Bearer ' + jwt.sign({
                            email: existingUser.email,
                            id: existingUser._id,
                            role: existingUser.role
                        },
                            secretCode);
                        res.status(200).json({ user: existingUser, token: token })
                    }
                }
            }
        } catch (err) {

            return res.status(status.BAD_REQUEST).json(err);
        }

    }
}

module.exports.createTrain = async(req,res)=>{
    try {
        const response = " ok"
        return res.status(status.OK).json(response);
    } catch (err) {
        
         return res.status(status.BAD_REQUEST).json(err);
    }
}

module.exports.trainInfo = async(req,res)=>{
    try {
        const response = " ok"
        return res.status(status.OK).json(response);
    } catch (err) {
        
        return res.status(status.BAD_REQUEST).json(err);
    }
}

module.exports.updateTrainStatus = async(req,res)=>{
    try {
        const response = " ok"
        return res.status(status.OK).json(response);
    } catch (err) {
        
         return res.status(status.BAD_REQUEST).json(err);
    }
}

module.exports.deleteTrain = async(req,res)=>{
    try {
        const response = " ok"
        return res.status(status.OK).json(response);
    } catch (err) {
        
         return res.status(status.BAD_REQUEST).json(err);
    }
}


