const status = require('../constant/httpStatusCodes')
const validator = require("../validations/validation")
const UserModel = require("../models/user")
const TrainModel = require("../models/train")
const bcrypt = require('bcryptjs')
const jwt = require("jsonwebtoken")
const mailer = require("../ndoemailor/mailer")
const secretCode = process.env.SECRET_CODE;


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
                    if (existingUser.role != 2) {
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

module.exports.createTrain = async (req, res) => {
    try {
        const existingTrain = await TrainModel.findOne({ trainNo: req.body.trainNo })
        if (existingTrain) {
            return res.status(400).json({ message: "train number Already exists" })
        }
        const response = await TrainModel.create({
            trainNo: req.body.trainNo,
            trName: req.body.trName,
            source: req.body.source,
            destination: req.body.destination,
            departTime: req.body.departTime,
            arrivalTime: req.body.arrivalTime,
            currentStation : req.body.currentStation    
        })

        return res.status(status.OK).json({ train: response });
    } catch (err) {

        return res.status(status.BAD_REQUEST).json(err);
    }
}

module.exports.trainInfo = async (req, res) => {
    try {
        const id = req.params.id
        const response = await TrainModel.findById(id)
        return res.status(status.OK).json(response);
    } catch (err) {

        return res.status(status.BAD_REQUEST).json(err);
    }
}

module.exports.updateTrainStatus = async (req, res) => {
    
    try {
        const id = req.params.id
         const train = await TrainModel.findById(id);
         train.currentStation = req.body.currentStation
         await train.save();
         for (i=0; i < train.users.length; i++)
            {   
            const user = await UserModel.findById(train.users[i])
            mailer.trainUpdate(user.email,train,user)
            }
        const response = train
        return res.status(status.OK).json(response);
    } catch (err) {

        return res.status(status.BAD_REQUEST).json(err);
    }
}

module.exports.deleteTrain = async (req, res) => {
    try {
        const id = req.params.id
        await TrainModel.findByIdAndDelete(id)
        return res.status(status.OK).json("train has been deleted.");
    } catch (err) {

        return res.status(status.BAD_REQUEST).json(err);
    }
}


