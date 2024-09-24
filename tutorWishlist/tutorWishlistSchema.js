const mongoose = require("mongoose")

const tutorSchema = new mongoose.Schema({
    tutorId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"tutors",
    },
    booksId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"boooks"
    }
})

module.exports = new mongoose.model("wishlist",tutorSchema)