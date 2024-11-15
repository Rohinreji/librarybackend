const studentAddToCartSchema = require("./studentAddToCartSchema");
const studentRentBookSchema = require("..//studentRentBook/studentRentBookSchema");

const studentAddToCart = async (req, res) => {
  try {
    let cart = new studentAddToCartSchema({
      studentId: req.body.studentId,
      booksId: req.body.booksId,
      addedQuantity: req.body.addedQuantity,
      isActive: true,
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
      err: error,
    });
  }
};

const rentAllBookFromCart = async (req, res) => {
  try {
    const result = await studentAddToCartSchema.find({
      studentId: req.body.studentId,
    });
    console.log("res", result);

    for (i = 0; i <= result.lenght; i++) {
      const newBook = await new studentRentBookSchema({
        studentId: "",
        booksId: "",
        addedQuantity: 0,
      });
      newBook.studentId = result[i].studentId;
      newBook.booksId = result[i].booksId;
      newBook.addedQuantity = result[i].addedQuantity;
    }
    await studentAddToCartSchema.deleteMany({ studentId: req.body.studentId });
    res.status(200).json({
      msg: "Request has been sended",
    });
  } catch (error) {
    res.status(400).json({
      msg: "APi fail",
      err: err,
    });
  }
};
module.exports = {
  studentAddToCart,
  studentViewCart,
  removeBookFromCart,
  rentAllBookFromCart,
};
