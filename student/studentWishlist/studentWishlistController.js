const studentWishlistSchema = require("./studentWishlistSchema");
const booksSchema = require("../../books/booksSchema");

const addToWishlist = async (req, res) => {
  try {
    const { studentId, booksId } = req.body;
    const wishlistBook = await booksSchema.findOne({ _id: booksId });
    wishlistBook.wishlistedUserId.push(studentId);

    let wishlist = new studentWishlistSchema({
      studentId: studentId,
      booksId: booksId,
    });
    await wishlist.save();
    await wishlistBook.save();
    console.log("stdId0", studentId);

    res.status(200).json({
      data: wishlist,
      msg: "Added to wishlist",
    });
  } catch (error) {
    res.status(400).json({
      msg: "Api fail",
      err: error,
    });
  }
};

const removeFromWishlist = async (req, res) => {
  try {
    const { studentId, booksId } = req.body;
    const wishlistId = await studentWishlistSchema.findOne({ booksId });
    console.log(wishlistId);
    await booksSchema.findByIdAndUpdate(
      {
        _id: booksId,
      },
      { $pull: { wishlistedUserId: studentId } }
    );
    const result = await studentWishlistSchema.findByIdAndDelete(
      { _id: wishlistId._id },
    );
    res.status(200).json({
      msg: "Removed from wishlist",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      msg: "Fail on api",
      err: error,
    });
  }
};
const studentViewAllWishlist = async (req, res) => {
  try {
    const wishlist = await studentWishlistSchema
      .find({ studentId: req.body.studentId }, { isWished: true })
      .populate("booksId");
    res.status(200).json({
      msg: "Data retreievd",
      data: wishlist,
    });
  } catch (error) {
    res.status(400).json({
      msg: "api fail",
      err: error,
    });
  }
};
module.exports = { addToWishlist, removeFromWishlist, studentViewAllWishlist };
