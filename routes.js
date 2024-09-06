const express = require("express");
const router = express.Router();
const student = require("./student/studentController");
const tutor = require("./tutor/tutorController");
const books = require("./books/booksController");
const rent = require("./rendedBooks/rendedBooksController");
const rentBookByTutor = require("./rendedBooks/rendedBooksController")
const tutorAddToCart = require("./TutorAddToCart/tutorAddToCartController");

router.post("/studentSignup",student.upload, student.addStudent);
router.post("/studentLogin", student.studentLogin);
router.post("/studentForgotPassword", student.studentForgotPassword);
router.post("/deleteStudent/:id",student.deleteStudent)
router.post("/acceptStudent/:id",student.acceptStudent)
router.get("/viewAllStudents",student.viewAllStudents)
router.get("/viewStudentById/:id",student.viewStudentById)
// tutor

router.post("/tutorSignup", tutor.upload, tutor.addTutor);
router.post("/tutorLogin", tutor.tutoLogin);
router.get("/tutorViewProfile/:id", tutor.viewProfile);
router.post("/tutor-forgot-password", tutor.TutorForgetPassword);
router.get("/view-all/tutor",tutor.viewAllTutors) 
router.post("/tutorAddToCart",tutorAddToCart.tutorCart)
router.post("/tutorViewAddToCart",tutorAddToCart.viewTutorCart)
router.post("/tutorRemoveFromCart/:id",tutorAddToCart.removeFromCart)



// admin && tutor

router.put("/approveTutor/:id",tutor.ApproveTutorsById)
router.put("/rejectTutor/:id",tutor.rejectTutorsById)
router.get("/viewAllApprovedTutors",tutor.viewAllApprovedTutors)
router.get("/viewAllPendingTutors",tutor.viewAllPendingTutors)
router.get("/viewAllRejectedTutors",tutor.viewAllRejectedTutors)

// admin && renteBook
router.post("/rendBookByTutor" ,rentBookByTutor.addRentBook) 
router.get("/adminViewRental",rentBookByTutor.adminViewRental)
router.post("/adminApproveRental/:id",rentBookByTutor.adminApproveRental)
router.post("/adminRejectRental/:id",rentBookByTutor.adminRejectRental)
router.get("/adminViewPendingRental",rentBookByTutor.adminViewPendingRental)
router.post("/tutorReturnReq/:id",rentBookByTutor.tutorReturnReq)
router.get("/adminViewReturnReq",rentBookByTutor.adminViewReturnReq)
router.post("/adminApproveReturnReq",rentBookByTutor.approveReturnReq)
router.post("/adminRejectReturnReq",rentBookByTutor.rejectReturnReq)



// books

router.post("/add-books", books.upload, books.addBooks);
router.get("/viewAllBooks", books.viewAllBook);
router.get("/view-single-product/:id", books.tutorViewSingleProduct);
router.post("/updateBookQuantity",books.updateQuantity)

// rent
router.post("/rendBookByTutor" ,rentBookByTutor.addRentBook) 
router.post("/tutorViewRental",rentBookByTutor.tutorViewRental)
router.get("/tutorViewRentalInReturn/:id",rentBookByTutor.tutorViewRentalInReturn)

router.post("/rentBooks", rent.addRentBook);

module.exports = router;
