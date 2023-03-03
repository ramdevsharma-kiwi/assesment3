const status = require('../constant/httpStatusCodes')

module.exports.register = async(req,res)=>{
    try {
        const response = " ok"
        return res.status(status.OK).json(response);
    } catch (err) {
        
         return res.status(status.BAD_REQUEST).json(err);
    }
}


module.exports.login = async(req,res)=>{
    try {
        const response = " ok"
        return res.status(status.OK).json(response);
    } catch (err) {
        
         return res.status(status.BAD_REQUEST).json(err);
    }
}

module.exports.subscribeTrain = async(req,res)=>{
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