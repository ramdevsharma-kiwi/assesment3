const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email:{
        type: String,
        required : true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    name:{
        type: String,
    },
    phoneNo:{
        type: Number,
    },
    
    isAdmin: {
        type : Number,
        enum : [0,1,2],
        default: 0  // 0 is for user  //1 is for admin   //2 is for subAdmin
    },
});

const User = mongoose.model('User',userSchema);
module.exports = User;