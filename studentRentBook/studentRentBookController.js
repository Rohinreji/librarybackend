const studentRentBookSchema = require("./studentRentBookSchema");

//addStdRentBook

const addStdRentBook = async (req, res) => {
  try {
    let rentedBook = new studentRentBookSchema({
      studentId: req.body.studentId,
      booksId: req.body.booksId,
      addedQuantity: req.body.addedQuantity,
    });
    const result = await rentedBook.save();
    return res.status(200).json({
      msg: "Book rended",
      data: result,
    });
  } catch (error) {
    return res.status(404).json({
      msg: "error",
      error: error,
    });
  }
};
//AdminApproveStdRentalBooks

const approveStdRentalBooks = async (req, res) => {
  try {
    var date = new Date();
    const rentedBook = await studentRentBookSchema.findByIdAndUpdate(
      { _id: req.params.id },
      { adminApprove: "approved", approvedDate: date, returnBook: "onRent" }
    );
    if (!rentedBook) {
      res.status(500).json({
        msg: "No request was received",
      });
    } else {
      res.status(200).json({
        msg: "Request approved",
        data: rentedBook,
      });
    }
  } catch (error) {
    return res.status(404).json({
      msg: "error",
      error: error,
    });
  }
};
//adminRejectStdBookRental
const rejectStdBookRental = async (req, res) => {
  try {
    const rejectBook = await studentRentBookSchema.findByIdAndUpdate(
      { _id: req.params.id },
      { adminApprove: "rejected", returnBook: "rejected" }
    );
    res.status(200).json({
      msg: "Book rejected",
      data: rejectBook,
    });
  } catch (error) {
    res.status(404).json({
      msg: "error",
      error: error,
    });
  }
};

//studentViewApprovedRentals

const studentViewApprovedRentals = async (req, res) => {
  try {
    const approve = await studentRentBookSchema.find({
      adminApprove: "approved",
    });
    console.log(approve);

    if (approve) {
      const approveStdRental = await studentRentBookSchema
        .find({
          studentId: req.body.studentId,
          adminApprove: "approved",
        })
        .populate("booksId");
      console.log(approveStdRental);

      res.status(200).json({
        msg: "Data retrieved",
        data: approveStdRental,
      });
    } else {
      res.status(408).json({
        msg: "No data found",
      });
    }
  } catch (error) {
    res.status(400).json({
      msg: "error",
      err: error,
    });
  }
};

const studentViewApprovedRentalSingle = async (req, res) => {
  try {
    const result = await studentRentBookSchema
      .findOne({ _id: req.params.id })
      .populate("booksId");

    res.status(200).json({
      data: result,
      msg: "data retrieved",
    });
  } catch (error) {
    res.json({
      status: 400,
      err: error,
    });
  }
};

//AdminViewPendingRentals

const viewPendingRentals = async (req, res) => {
  try {
    const pendingRentals = await studentRentBookSchema
      .find({ adminApprove: "pending" })
      .populate("studentId")
      .populate("booksId");

    res.status(200).json({
      data: pendingRentals,
      msg: "data retrieved",
    });
  } catch (error) {
    res.status(404).json({
      error: error,
      msg: "error",
    });
  }
};
//adminViewAllRejectedRentals

const viewAllRejectedStdRentals = async (req, res) => {
  try {
    const rejectedRentals = await studentRentBookSchema
      .find({
        adminApprove: "rejected",
      })
      .populate("booksId");
    return res.status(200).json({
      msg: "data retrieved",
      data: rejectedRentals,
    });
  } catch (error) {
    return res.status(404).json({
      msg: "error",
      error: error,
    });
  }
};

const stdBookReturnReq = async (req, res) => {
  try {
    const returnReq = await studentRentBookSchema.findByIdAndUpdate(
      { _id: req.params.id },
      { returnBook: "pending" }
    );
    res.status(200).json({
      data: returnReq,
      msg: "Return request has been sended",
    });
  } catch (error) {
    res.status(400).json({
      err: error,
      msg: "Api fail",
    });
  }
};

const adminViewApprovedStdRentals = async (req, res) => {
  try {
    const result = await studentRentBookSchema
      .find({ adminApprove: "approved" })
      .populate("booksId")
      .populate("studentId");
    res.status(200).json({
      data: result,
      msg: "data retrieved",
    });
  } catch (error) {
    res.status(400).json({
      err: err,
      msg: "Api fail",
    });
  }
};

const adminViewReturnStdReq = async (req, res) => {
  try {
    const approvedBook = await studentRentBookSchema.find({
      adminApprove: "approved",
    });
    console.log("approvedBooks", approvedBook);

    if (approvedBook) {
      const result = await studentRentBookSchema
        .find({ returnBook: "pending" })
        .populate("booksId")
        .populate("studentId");
      console.log("res", result);
      res.status(200).json({
        data: result,
        msg: "Data retrieved",
      });
    } else {
      res.status(402).json({
        msg: "no data found",
      });
    }
  } catch (error) {
    res.status(400).json({
      err: error,
      msg: "Api fail",
    });
  }
};
module.exports = {
  addStdRentBook,
  approveStdRentalBooks,
  rejectStdBookRental,
  studentViewApprovedRentals,
  viewPendingRentals,
  viewAllRejectedStdRentals,
  studentViewApprovedRentalSingle,
  stdBookReturnReq,
  adminViewApprovedStdRentals,
  adminViewReturnStdReq,
};
