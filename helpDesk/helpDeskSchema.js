const mongoose = require("mongoose")
const helpDeskSchema = (
    {
        message:{
            type:String,
            required:true
        },
        tutorId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"tutors"
        },
        value:{
            type:String,
        }
    }
) 
module.exports = new mongoose.model("helpDesk",helpDeskSchema)

