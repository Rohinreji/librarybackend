const rendedBooksSchema = require("../rendedBooks/rendedBooksSchema");
const tutorAddToCartSchema = require("./tutorAddToCartSchema");

const tutorCart = async (req, res) => {
  try {
    let cart = new tutorAddToCartSchema({
      tutorId: req.body.tutorId,
      booksId: req.body.booksId,
      addedQuantity:req.body.addedQuantity
    });
    const result = await cart.save();
    res.status(200).json({
      data: result,
      msg: "Book added to cart",
    });
  } catch (error) {
    res.status(400).json({
      err: error,
      msg: "error",
    });
  }
};

const viewTutorCart = async (req, res) => {
  try {
    const result = await tutorAddToCartSchema
      .find({ tutorId: req.body.tutorId })
      .populate("booksId");
    res.status(200).json({
      data: result,
      msg: "data retrieved",
    });
  } catch (error) {
    res.status(400).json({
      err: error,
    });
  }
};

const removeFromCart = async (req, res) => {
  try {
    const result = await tutorAddToCartSchema.findByIdAndDelete({
      _id: req.params.id,
    });
    res.status(200).json({
      data: result,
      msg: "book removed from cart",
    });
  } catch (error) {
    res.status(400).json({
      err: error,
      msg: error,
    });
  }
};

const rentCartProducts = async (req, res) => {
  try {
    const result = await tutorAddToCartSchema.find({
      _tutorId: req.params.tutorId,
    });

    for (let i = 0; i < result.length; i++) {
      let newBook = await new rendedBooksSchema({
        booksId: "",
        tutorId: "",
        addedQuantity: 0,
      });
      newBook.booksId = result[i].booksId;
      newBook.tutorId = result[i].tutorId;
      newBook.addedQuantity = result[i].addedQuantity;
      console.log("ifd", result[i].booksId);
      await newBook.save();
    }
    // result.map((e) => {
    //   newBook.booksId = e.booksId;
    //   newBook.tutorId = e.tutorId;
    //   newBook.addedQuantity = e.addedQuantity

    //   const rendBook = newBook.save()

    // });

    await tutorAddToCartSchema.deleteMany({ _tutorId: req.params.tutorId });

    res.status(200).json({
      msg: "request sended",
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      err: error,
      msg: "error",
    });
  }
};

module.exports = { tutorCart, viewTutorCart, removeFromCart, rentCartProducts };
