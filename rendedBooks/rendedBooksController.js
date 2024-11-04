const rendedBooksSchema = require("./rendedBooksSchema");
const addRentBook = async (req, res) => {
  try {
    let books = new rendedBooksSchema({
      tutorId: req.body.tutorId,
      booksId: req.body.booksId,
      addedQuantity: req.body.addedQuantity,
    });
    const result = await books.save();
    console.log(result);
    res.status(200).json({ data: result, msg: "rent request sended" });
  } catch (error) {
    res.status(400).json({ err: error, msg: "error" });
  }
};

const tutorViewRental = async (req, res) => {
  try {
    // const approve = await rendedBooksSchema.find({adminApprove:"approved"});
    // console.log(approve,"approved");
    // if (approve) {
    const result = await rendedBooksSchema
      .find({ adminApprove: "approved", tutorId: req.body.tutorId })
      .populate("booksId");

    console.log(result, "result");

    res.status(200).json({
      data: result,
      msg: "data retrieved",
    });
    // } else {
    //   res.status(408).json({
    //     msg: "no data found ",
    //   });
    // }
  } catch (error) {
    res.json({
      status: 400,
      err: error,
    });
  }
};

const adminViewRental = async (req, res) => {
  try {
    const result = await rendedBooksSchema
      .find({ adminApprove: "pending" })
      .populate("booksId")
      .populate("tutorId");
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

const adminApproveRental = async (req, res) => {
  try {
    var date = new Date();
    console.log(date, "date");
    const result = await rendedBooksSchema.findByIdAndUpdate(
      { _id: req.params.id },
      { adminApprove: "approved", approvedDate: date }
    );
    console.log(result);

    if (!result) {
      res.status(500).json({
        msg: "No request was sended",
      });
    } else {
      res.status(200).json({
        data: result,
        msg: "request approved",
      });
    }
  } catch (error) {
    res.status(400).json({
      err: error,
      msg: "error",
    });
  }
};
const adminRejectRental = async (req, res) => {
  try {
    const result = await rendedBooksSchema.findByIdAndUpdate(
      { _id: req.params.id },
      { adminApprove: "rejected" }
    );
    console.log(result);
    if (!result) {
      res.status(500).json({
        msg: "No request was sended",
      });
    } else {
      res.status(200).json({
        data: result,
        msg: "request rejected",
      });
    }
  } catch (error) {
    res.status(400).json({
      err: error,
      msg: "error",
    });
  }
};

const adminViewPendingRental = async (req, res) => {
  try {
    const result = await rendedBooksSchema
      .find({ adminApprove: "pending" })
      .populate("booksId")
      .populate("tutorId");
    res.status(200).json({
      data: result,
      msg: "data retrieved",
    });
  } catch (error) {
    res.status(400).json({
      err: error,
      msg: error,
    });
  }
};

const adminApprovedBooks = async (req, res) => {
  try {
    const result = await rendedBooksSchema
      .find({ adminApprove: "approved" })
      .populate("booksId")
      .populate("tutorId");

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

const tutorViewRentalInReturn = async (req, res) => {
  try {
    const result = await rendedBooksSchema
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

const tutorReturnReq = async (req, res) => {
  try {
    const result = await rendedBooksSchema.findOneAndUpdate(
      { _id: req.params.id },
      { returnBook: "pending" }
    );
    console.log(result);
    res.status(200).json({
      data: result,
      msg: "return request send sucessfully",
    });
  } catch (error) {
    res.status(400).json({
      err: error,
      msg: "error",
    });
  }
};

const adminViewReturnReq = async (req, res) => {
  try {
    const result = await rendedBooksSchema
      .find({ returnBook: "pending" })
      .populate("booksId")
      .populate("tutorId");
    res.status(200).json({
      data: result,
      msg: "data sucessfully retrieved",
    });
  } catch (error) {
    res.status(400).json({
      err: error,
      msg: "error",
    });
  }
};

const approveReturnReq = async (req, res) => {
  try {
    const result = await rendedBooksSchema.findByIdAndUpdate(
      { _id: req.body.id },
      { returnBook: "approve", adminApprove: "pending" }
    );

    res.status(200).json({
      data: result,
      msg: "return request approved",
    });
  } catch (error) {
    res.status(400).json({
      err: error,
      msg: "error",
    });
  }
};

const rejectReturnReq = async (req, res) => {
  try {
    const result = await rendedBooksSchema.findByIdAndUpdate(
      { _id: req.body.id },
      { returnBook: "rejected" }
    );
    res.status(200).json({
      data: null,
      msg: "return request rejected",
    });
  } catch (error) {
    res.status(400).json({
      err: error,
      msg: "error",
    });
  }
};

// const rentCartProducts = async (req,res) =>
// {
//   try {
//     const result = await rendedBooksSchema.find({_id:req.params.id})
//     res.status(200).json({
//       data:result,
//       msg:"data retrived"
//     })

//   } catch (error) {
//     res.status(400).json({
//       err:error,
//       msg:"error"
//     }
//     )
//   }
// }

module.exports = {
  addRentBook,
  tutorViewRental,
  adminViewRental,
  adminApproveRental,
  adminRejectRental,
  adminViewPendingRental,
  tutorViewRentalInReturn,
  tutorReturnReq,
  adminViewReturnReq,
  approveReturnReq,
  rejectReturnReq,
  adminApprovedBooks,
};
