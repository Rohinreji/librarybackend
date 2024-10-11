const mongoose = require("mongoose")

const tutorWishlistSchema = new mongoose.Schema({
    tutorId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"tutors",
    },
    booksId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"books"
    },
    isActive:{
        type:Boolean,
        default:false
    }
},    
{timestamps:true}

)

module.exports = new mongoose.model("tutorWishlist",tutorWishlistSchema)