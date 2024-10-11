const studentWishlistSchema = require("./studentWishlistSchema");

const addToWishlist = async (req, res) => {
  try {
    let wishlist = new studentWishlistSchema({
      studentId: req.body.studentId,
      booksId: req.body.booksId,
      isWished: true,
    });
    const result = await wishlist.save();
    res.status(200).json({
      msg: "Added to wishlist",
      data: result,
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
    const wishlistId = await studentWishlistSchema.findOne({
      studentId,
      booksId,
    });
    console.log(wishlistId);

    const result = await studentWishlistSchema.findByIdAndDelete(
      { _id: wishlistId._id },
      { isWished: false }
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
    const wishlist = await studentWishlistSchema.find(
      { studentId: req.body.studentId},
      { isWished: true }
    )
    .populate("booksId")
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
