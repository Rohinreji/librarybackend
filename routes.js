const express = require("express");
const router = express.Router();
const student = require("./student/studentController");
const tutor = require("./tutor/tutorController");
const books = require("./books/booksController");
const rent = require("./rendedBooks/rendedBooksController");
const rentBookByTutor = require("./rendedBooks/rendedBooksController");
const tutorAddToCart = require("./TutorAddToCart/tutorAddToCartController");
const rentBookByStudent = require("./studentRentBook/studentRentBookController");
const tutorWishlist = require("./tutorWishlist/tutrWishlistController");
const helpDesk = require("./helpDesk/helpDeskController")
const studentAddToCart1 = require("./studentAddToCart/studentAddToCartController");
const studentWishlist = require("./student/studentWishlist/studentWishlistController");
//student
router.post("/studentSignup", student.upload, student.addStudent);
router.post("/studentLogin", student.studentLogin);
router.post("/studentForgotPassword", student.studentForgotPassword);
router.post("/deleteStudent/:id", student.deleteStudent);
router.post("/acceptStudent/:id", student.acceptStudent);
router.get("/viewAllStudents", student.viewAllStudents);
router.get("/viewStudentById/:id", student.viewStudentById);
router.post("/viewAllApprovedStudents", student.viewAllApprovedStudents);
router.post("/viewAllRejectedStudents", student.viewAllRejectedStudents);
router.post(
  "/updateStudentProfile/:id",
  student.upload,
  student.updateStudentProfile
);
router.get("/viewAllStdPendingReq", student.viewAllPendingStudents);

// tutor
router.post("/tutorSignup", tutor.upload, tutor.addTutor);
router.post("/tutorLogin", tutor.tutoLogin);
router.get("/tutorViewProfile/:id", tutor.viewProfile);
router.post("/tutor-forgot-password", tutor.TutorForgetPassword);
router.post("/updateTutorProfile/:id",tutor.upload, tutor.updateTutorProfile);
router.get("/view-all/tutor", tutor.viewAllTutors);
router.post("/tutorAddToCart", tutorAddToCart.tutorCart);
router.post("/tutorViewAddToCart", tutorAddToCart.viewTutorCart);
router.post("/tutorRemoveFromCart/:id", tutorAddToCart.removeFromCart);
router.get("/rentCartProductsByTutor/:id", tutorAddToCart.rentCartProducts);

//student && rent
router.post("/studentAddRentBook", rentBookByStudent.addStdRentBook);
router.post("/approveStdRental/:id", rentBookByStudent.approveStdRentalBooks);
router.post(
  "/studentViewApprovedRentals",
  rentBookByStudent.studentViewApprovedRentals
);
router.post(
  "/adminViewStdApprovedRental",
  rentBookByStudent.adminViewApprovedStdRentals
);
router.post("/adminViewReturnStdReq", rentBookByStudent.adminViewReturnStdReq);
router.get("/viewAllPendingStdRentals", rentBookByStudent.viewPendingRentals);
router.post("/rejectStdRental/:id", rentBookByStudent.rejectStdBookRental);
router.get(
  "/viewRejectedStdRentals",
  rentBookByStudent.viewAllRejectedStdRentals
);
router.post("/stdReturnBookReq/:id", rentBookByStudent.stdBookReturnReq);
router.post(
  "/approveStdRentalSingleBook/:id",
  rentBookByStudent.studentViewApprovedRentalSingle
);
router.post("/studentAddToCart", studentAddToCart1.studentAddToCart);
router.post("/studentViewCart", studentAddToCart1.studentViewCart);
router.post("/removeBookFromCart/:id", studentAddToCart1.removeBookFromCart);
router.post("/rentAllBookFromCart", studentAddToCart1.rentAllBookFromCart);
router.post("/addToWishlist", studentWishlist.addToWishlist);
router.post("/removeFromWishlist", studentWishlist.removeFromWishlist);
router.get(
  "/studentViewAllWishlist/:id",
  studentWishlist.studentViewAllWishlist
);
router.post(
  "/rejectStdBookReturnReq",
  rentBookByStudent.rejectStdBookReturnReq
);
//admin && return
router.post(
  "/approveStdBookReturnReq",
  rentBookByStudent.approveStdBookReturnReq
);
//admin && tutors
router.put("/approveTutor/:id", tutor.ApproveTutorsById);
router.put("/rejectTutor/:id", tutor.rejectTutorsById);
router.get("/viewAllApprovedTutors", tutor.viewAllApprovedTutors);
router.get("/viewAllPendingTutors", tutor.viewAllPendingTutors);
router.get("/viewAllRejectedTutors", tutor.viewAllRejectedTutors);
router.post("/updateTutorProfile/:id", tutor.upload, tutor.updateTutorProfile);
router.get("/view-all/tutor", tutor.viewAllTutors);
router.post("/tutorAddToCart", tutorAddToCart.tutorCart);
router.post("/tutorViewAddToCart", tutorAddToCart.viewTutorCart);
router.post("/tutorRemoveFromCart/:id", tutorAddToCart.removeFromCart);
router.get("/rentCartProductsByTutor/:id", tutorAddToCart.rentCartProducts);

// tutorWishlist
router.post("/tutorwishlist", tutorWishlist.tutorWishlist);
router.post("/tutorRemoveFromWishlist", tutorWishlist.removeFromWishlist);
router.get("/viewAllWishlist/:id", tutorWishlist.viewAllWishlist);

// admin && tutors
router.put("/approveTutor/:id", tutor.ApproveTutorsById);
router.put("/rejectTutor/:id", tutor.rejectTutorsById);
router.get("/viewAllApprovedTutors", tutor.viewAllApprovedTutors);
router.get("/viewAllPendingTutors", tutor.viewAllPendingTutors);
router.get("/viewAllRejectedTutors", tutor.viewAllRejectedTutors);

// admin && renteBook
router.post("/rendBookByTutor", rentBookByTutor.addRentBook);
router.get("/adminViewRental", rentBookByTutor.adminViewRental);
router.post("/adminApproveRental/:id", rentBookByTutor.adminApproveRental);
router.post("/adminRejectRental/:id", rentBookByTutor.adminRejectRental);
router.get("/adminViewPendingRental", rentBookByTutor.adminViewPendingRental);
router.get(
  "/adminApprovedBooks",
  rentBookByTutor.adminApprovedBooks
); /*not used*/
router.post("/tutorReturnReq/:id", rentBookByTutor.tutorReturnReq);
router.get("/adminViewReturnReq", rentBookByTutor.adminViewReturnReq);
router.post("/adminApproveReturnReq", rentBookByTutor.approveReturnReq);
router.post("/adminRejectReturnReq", rentBookByTutor.rejectReturnReq);

// books
router.post("/add-books", books.upload, books.addBooks);
router.get("/viewAllBooks", books.viewAllBook);
router.get("/view-single-product/:id", books.tutorViewSingleProduct);
router.post("/removeBookQuantity/:id", books.removeQuantity);
router.post("/addBookQuantity/:id", books.addBookQuantity);
router.get("/filterBookByCategory/:cat", books.filterByCategory);
router.post("/edit-bookDetails/:id",books.upload,books.UpdateBookDetails)
router.post("/admin-deleteBook/:id" ,books.deleteBook )
// rent
router.post("/rendBookByTutor", rentBookByTutor.addRentBook);
router.post("/tutorViewRental", rentBookByTutor.tutorViewRental);
router.get(
  "/tutorViewRentalInReturn/:id",
  rentBookByTutor.tutorViewRentalInReturn
);
router.post("/rentBooks", rent.addRentBook);


// helpdesk or chat

router.post("/sendMessage", helpDesk.addMessage)
router.post("/getMessage/:id" ,helpDesk.getMessage)

module.exports = router;
