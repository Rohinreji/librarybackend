const mongoose = require("mongoose")
const rendedBooksSchema = new mongoose.Schema({
        tutorId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"tutors",
        },
        booksId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"books",
        }
    })

    

module.exports = new mongoose.model("rented",rendedBooksSchema)