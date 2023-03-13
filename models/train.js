const mongoose = require("mongoose");

const TrainSchema = new mongoose.Schema({
    trainNo: {
        type: Number,
        required : true,
        unique: true,
    },
    trName: {
        type: String
    },
    users: [
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        },
    ],
    source: {
        type: String,
    },
    destination: {
        type: String,
    },
    departTime:{    
        type: String,
    },
    arrivalTime:{
        type: String,
    },
    currentStation:{
        type: String,
    }
},{
    timestamps: true
});

module.exports = mongoose.model("train", TrainSchema);