const studentAddToCartSchema = require("./studentAddToCartSchema");

const studentAddToCart = async (req, res) => {
  try {
    let cart = new studentAddToCartSchema({
      studentId: req.body.studentId,
      booksId: req.body.booksId,
      addedQuantity: req.body.addedQuantity,
    });
    const result = await cart.save();
    res.status(200).json({
      data: result,
      msg: "Book added to cart",
    });
  } catch (error) {
    res.status(400).json({
      error: error,
      msg: "error",
    });
  }
};

const studentViewCart = async (req, res) => {
  try {
    const cart = await studentAddToCartSchema
      .find({
        studentId: req.body.studentId,
      })
      .populate("booksId");
    res.status(200).json({
      msg: "Data retrevied",
      data: cart,
    });
  } catch (error) {
    res.status(400).json({
      msg: "api fail",
      err: error,
    });
  }
};
const removeBookFromCart = async (req, res) => {
  try {
    const cart = await studentAddToCartSchema.findByIdAndDelete({
      _id: req.params.id,
    });
    res.status(200).json({
      msg: "Removed from cart",
      data: cart,
    });
  } catch (error) {
    res.status(400).json({
      msg: "api fail",
      err:error
    });
  }
};
module.exports = { studentAddToCart, studentViewCart ,removeBookFromCart};
