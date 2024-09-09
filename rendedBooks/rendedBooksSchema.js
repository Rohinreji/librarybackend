const mongoose = require("mongoose");
const rendedBooksSchema = new mongoose.Schema({
  tutorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "tutors",
  },
  booksId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "books",
  },
  addedQuantity: {
    type: Number,
    required: true,
  },
  adminApprove: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending",
  },
  returnBook: {
    type: String,
    enum: ["pending", "approved", "onRent", "rejected"],
    default: "onRent",
  },
});

module.exports = new mongoose.model("renteds", rendedBooksSchema);
