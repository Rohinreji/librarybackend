const tutorWishlistSchema = require("./tutorWishlistSchema");

const tutorWishlist = async (req, res) => {
  try {
    const wishlist = await new tutorWishlistSchema({
      tutorId: req.body.tutorId,
      booksId: req.body.booksId,
    });

    res.status(200).json({
      data: wishlist,
      msg: "the product is wishlisted",
    });
  } catch (error) {
    res.status(400).json({
      err: error,
      msg: "error",
    });
  }
};

module.exports = {tutorWishlist}
