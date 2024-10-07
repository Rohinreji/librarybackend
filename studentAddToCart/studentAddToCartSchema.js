const mongoose=require("mongoose")
const studentAddToCartSchema=new mongoose.Schema({
    studentId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"students"
    },
    booksId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"books"
    },
    addedQuantity:{
        type:Number
    }
})

module.exports=new mongoose.model("studentCarts",studentAddToCartSchema)