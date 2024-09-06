const mongoose = require("mongoose")
const BookSchema =new mongoose.Schema ({
  bookTitle:{
    type:String,
  } ,
  author:{
    type:String,
  },
  yearOfPublication:{
    type:String,
    required:true
  },
  language:{
    type:String,
    required:true
  },
  availableCopies:{
    type:Number,
    required:true
  },
  category:{
    type:String,
    required:true
  },
  bookImage:{
    type:Object
  },
  status:{
    type:String,
    required:true
    
  }
})

module.exports = new mongoose.model("books",BookSchema)