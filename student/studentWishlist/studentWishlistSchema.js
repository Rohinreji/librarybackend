const mongoose = require("mongoose");
const studentWishlistSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "students",
  },
  booksId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "books",
  },
  isWished: {
    type: Boolean,
    default: false,
  },
});

module.exports = new mongoose.model("stdWishlist", studentWishlistSchema);
