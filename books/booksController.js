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

module.exports = { addBooks, upload, viewAllBook, tutorViewSingleProduct };
