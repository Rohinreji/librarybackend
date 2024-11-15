const e = require("express");
const booksSchema = require("./booksSchema");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, res, cb) {
    cb(null, "./upload");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage }).single("bookImage");

const addBooks = async (req, res) => {
  try {
    const {
      bookTitle,
      author,
      yearOfPublication,
      language,
      availableCopies,
      category,
      status,
    } = req.body;
    const books = new booksSchema({
      bookTitle,
      author,
      yearOfPublication,
      language,
      availableCopies,
      category,
      status,
      bookImage: req.file,
    });

    const existingBook = await booksSchema.findOne({ bookTitle });
    if (existingBook && existingBook.author === req.body.author) {
      res.status(500).json({
        msg: "aleready exist",
      });
    } else {
      const result = await books.save();
      res.status(200).json({
        data: result,
        msg: "Book added successfully",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({
      err: error,
      msg: "error",
    });
  }
};

const viewAllBook = async (req, res) => {
  try {
    const allBook = await booksSchema.find({});
    res.status(200).json({
      data: allBook,
      msg: "data retrieved",
    });
  } catch (error) {
    res.json({
      status: 400,
      err: error,
      msg: "error",
    });
  }
};

const tutorViewSingleProduct = async (req, res) => {
  try {
    const result = await booksSchema.findById({ _id: req.params.id });
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

const removeQuantity = async (req, res) => {
  try {
    const result = await booksSchema.findOne({ _id: req.params.id });

    if (result.availableCopies < req.body.quantity) {
      res.status(408).json({
        msg: "not available",
      });
    } else {
      let newQuantity = (await result.availableCopies) - req.body.quantity;
      const data = await booksSchema.findByIdAndUpdate(
        { _id: req.params.id },
        { availableCopies: newQuantity }
      );
      console.log(data);
      res.status(200).json({
        data: data,
        msg: "quantity updated",
      });
    }
  } catch (error) {
    res.status(400).json({
      err: error,
      msg: "error",
    });
  }
};

const addBookQuantity = async (req, res) => {
  try {
    const book = await booksSchema.findById({ _id: req.params.id });
    const newQuantity = (await book.availableCopies) + req.body.quantity;
    const result = await booksSchema.findByIdAndUpdate(
      { _id: req.params.id },
      { availableCopies: newQuantity }
    );
    res.status(200).json({
      data: result,
      msg: "quanity updated",
    });
  } catch (error) {
    res.status(400).json({
      err: error,
      msg: "error on",
    });
  }
};

const filterByCategory = async (req, res) => {
  try {
    const result = await booksSchema.find({ category: req.params.cat });
    res.status(200).json({
      data: result,
      msg: "success",
    });
  } catch (error) {
    res.status(400).json({
      err: error,
      msg: "error",
    });
  }
};

module.exports = {
  addBooks,
  upload,
  viewAllBook,
  tutorViewSingleProduct,
  removeQuantity,
  addBookQuantity,
  filterByCategory,
};
