const status = require('../constant/httpStatusCodes')

module.exports.login = async(req,res)=>{
    try {
        const response = " ok"
        return res.status(status.OK).json(response);
    } catch (err) {
        
         return res.status(status.BAD_REQUEST).json(err);
    }
}

module.exports.createSubAdmin = async(req,res)=>{
    try {
        const response = " ok"
        return res.status(status.OK).json(response);
    } catch (err) {
        
         return res.status(status.BAD_REQUEST).json(err);
    }
}

module.exports.giveRights = async(req,res)=>{
    try {
        const response = " ok"
        return res.status(status.OK).json(response);
    } catch (err) {
        
         return res.status(status.BAD_REQUEST).json(err);
    }
}

module.exports.deleteSubAdmin = async(req,res)=>{
    try {
        const response = " ok"
        return res.status(status.OK).json(response);
    } catch (err) {
        
         return res.status(status.BAD_REQUEST).json(err);
    }
}