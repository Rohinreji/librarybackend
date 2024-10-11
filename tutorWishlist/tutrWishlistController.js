const booksSchema = require("../books/booksSchema");
const tutorWishlistSchema = require("./tutorWishlistSchema");

const tutorWishlist = async (req, res) => {
  try {
    const { tutorId, booksId } = req.body;

    const wishlistBook = await booksSchema.findOne({ _id: booksId });

    wishlistBook.wishlistedUserId.push(tutorId);

    let wishlist = new tutorWishlistSchema({
      tutorId: tutorId,
      booksId: booksId,
    });

    await wishlist.save();
    await wishlistBook.save();

    res.status(200).json({
      data: wishlist, // Return the saved wishlist
      msg: "Added to wishlist",
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(400).json({
      err: error.message,
      msg: "Error occurred",
    });
  }
};

const removeFromWishlist = async (req, res) => {
  try {
    const { tutorId, booksId } = req.body;

    const wishlistedBook = booksSchema.findOne({ booksId });
    const wishlistArr = wishlistedBook.wishlistedUserId;

    await booksSchema.findByIdAndUpdate(
      { _id: req.body.booksId },
      {
        $pull: { wishlistedUserId: req.body.tutorId },
      }
    );

    const wishlist = await tutorWishlistSchema.findOne({ tutorId, booksId });
    await tutorWishlistSchema.findByIdAndDelete({ _id: wishlist._id });
    res.status(200).json({
      msg: "removed from wishlist",
      data: wishlist,
    });
  } catch (error) {
    res.status(400).json({
      err: error,
      msg: "error",
    });
  }
};

const viewAllWishlist = async (req, res) => {
  try {
    const result = await tutorWishlistSchema
      .find({ tutorId: req.params.id })
      .populate("booksId");
    res.status(200).json({
      data: result,
      msg: "data retrieved",
    });
  } catch (error) {
    res.status(400).json({
      err: error,
      msg: "error",
    });
  }
};

module.exports = { tutorWishlist, removeFromWishlist, viewAllWishlist };
