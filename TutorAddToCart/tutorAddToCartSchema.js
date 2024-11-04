const mongoose = require("mongoose")

const tutorAddToCartSchema = new mongoose.Schema({
    tutorId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"tutors",
    },
    booksId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"books",
    },
    addedQuantity :{
        type:Number
    },
    isActive:{
        type:Boolean,
        default:false
    }
})
module.exports = new mongoose.model("tutorCarts",tutorAddToCartSchema)