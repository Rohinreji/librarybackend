const mongoose = require("mongoose")
const helpDeskSchema = new mongoose.Schema(
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

    },
    
    {
        timestamps: true,
    }
) ;
module.exports = new mongoose.model("helpDesk",helpDeskSchema)

