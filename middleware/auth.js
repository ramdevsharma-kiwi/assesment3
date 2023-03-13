const jwt = require("jsonwebtoken")
const secretCode = process.env.SECRET_CODE

const authorization = (req, res, next)=>{
    try{
        let token =  req.headers.authorization;
        if (token){
            token = token.split(" ")[1];
            let user = jwt.verify(token, secretCode);
            req.userId = user.id;
            req.userRole = user.role
            req.permission = user.havePermission
            req.email = user.email
        }
        else{
            res.status(401).json ( {message : "Unauthorized user"})
        }
        next();
    }catch(error){
        console.log(error)
        res.status(401).json({message : "Unauthorized User"})

    }
}

const isAdmin = ( req, res, next)=>{
    try {
        if(req.userRole == 1 && req.permission === true){
            next()
            
        }
        else{
            res.status(401).json ( {message : "Unauthorized admin"})   
        }
        
    } catch (error) {
        res.status(401).json({message : "Unauthorized admin"}) 
    }
}


const isUser = ( req, res, next)=>{
    try {
        if(req.userRole == 0){
            next()
           
        }
        else{
            res.status(401).json ( {message : "Unauthorized user"})    
        }
        
    } catch (error) {
        res.status(401).json({message : "Unauthorized User"}) 
    }
}           

const isSubAdmin = ( req, res, next)=>{
    try {
        if(req.userRole == 2  ){
            if(req.permission === true){ 
                next()
            }
            else{
                res.status(401).json ( {message : "admin has not given this permission to you"})
            }
            
        }
        else{
              
            res.status(401).json ( {message : "Unauthorized subadmin"})
            
        }
        
    } catch (error) {
        res.status(401).json({message : "Unauthorized subadmin"}) 
    }
}


module.exports = { authorization, isAdmin , isUser, isSubAdmin }