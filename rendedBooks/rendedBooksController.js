const rendedBooksSchema = require("./rendedBooksSchema");
const addRentBook = async (req, res) => {
  try {
    let books = new rendedBooksSchema({
      tutorId: req.body.tutorId,
      booksId: req.body.booksId,
    });
    const result = await books.save();
    res.status(200).json({ data: result, msg: "rent request sended" });
  } catch (error) {
    res.status(400).json({ err: error, msg: "error" });
  }
};

const tutorViewRental = async (req,res) =>
{
try {
  const result = await rendedBooksSchema.findOne({tutorId:req.body.tutorId})
  .populate("booksId")
 res.status(200).json({
    data:result,
    msg:"data retrieved"
  })
} catch (error) {
   res.json({
    status:400,
    err:error})
}  
}

module.exports = { addRentBook, tutorViewRental };
