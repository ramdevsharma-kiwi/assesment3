const status = require('../constant/httpStatusCodes')
const validator = require("../validations/validation")
const UserModel = require("../models/user")
const TrainModel = require("../models/train")
const bcrypt = require('bcryptjs')
const jwt = require("jsonwebtoken")
const mailer = require("../ndoemailor/mailer")
const secretCode = process.env.SECRET_CODE;



module.exports.register = async (req, res) => {
    const bool = validator.registerSchema.validate({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
    })
    if (bool.error != undefined) {
        res.send(bool.error.details[0].message);
    }
    else {
        try {
            const existingUser = await UserModel.findOne({ email: req.body.email })
            if (existingUser) {
                return res.status(400).json({ message: "Email Already exists" })
            }
            const hashedPassword = await bcrypt.hash(req.body.password, 10)
            const result = await UserModel.create({
                name: req.body.name,
                email: req.body.email,
                password: hashedPassword,
            })
            return res.status(200).json({ user: result })
        } catch (err) { 

            return res.status(status.BAD_REQUEST).json(err);
        }
    }
}

module.exports.login = async (req, res) => {
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
                    if (existingUser.role != 0) {
                        return res.status(400).json({ message: "Invalid Credentials" })
                    }
                    else {
                        const token = 'Bearer ' + jwt.sign({
                            email: existingUser.email,
                            id: existingUser._id,
                            role: existingUser.role,
                            havePermission: existingUser.havePermission
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

module.exports.subscribeTrain = async (req, res) => {
    try {
        const train_id = req.params.train_id
        const user_id = req.userId
        const train = await TrainModel.findById(train_id)
        const user = await UserModel.findById(user_id) 
        train.users.push(user_id)
        user.subscribeTrain = train_id
        train.save()
        user.save()
        mailer.subscribeEmail(user.email , train , user)
        return res.status(status.OK).json("train successfully subscribed");
    } catch (err) {

        return res.status(status.BAD_REQUEST).json(err);
    }
}

module.exports.trainInfo = async (req, res) => {
    try {
        const user =await UserModel.findById(req.userId)
        const train =await TrainModel.findById(user.subscribeTrain)
        const response = train
        return res.status(status.OK).json(response);
    } catch (err) {

        return res.status(status.BAD_REQUEST).json(err);
    }
}