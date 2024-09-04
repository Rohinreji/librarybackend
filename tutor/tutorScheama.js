const mongoose = require("mongoose")

const tutorSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    idNo:{
        type:Number,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    profile:{  
        type:Object
    },
    isAcive:{
        type:Boolean
    },
    adminApproved:{
        type:String,
        enum:["pending","approved","rejected"],
        default:"pending"
    }
})

module.exports = new mongoose.model("tutors",tutorSchema)