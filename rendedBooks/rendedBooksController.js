const rendedBooksSchema = require("./rendedBooksSchema");
const addRentBook = async (req, res) => {
  try {
    books = new rendedBooksSchema({
      tutorId: req.body.tutorId,
      booksId: req.body.booksId,
    });
    const result = await books.save();
    res.status(200).json({ data: result, msg: "rent request sended" });
  } catch (error) {
    res.status(400).json({ err: error, msg: "error" });
  }
};
module.exports = { addRentBook };
