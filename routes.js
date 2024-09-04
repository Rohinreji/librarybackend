const express = require("express");
const router = express.Router();
const student = require("./student/studentController");
const tutor = require("./tutor/tutorController");
const books = require("./books/booksController");
const rent = require("./rendedBooks/rendedBooksController");
const rentBookByTutor = require("./rendedBooks/rendedBooksController")


router.post("/student-signUp", student.upload, student.addStudent);
router.post("/studentLogin", student.studentLogin);
router.post("/studentForgotPassword", student.studentForgotPassword);

// tutor

router.post("/tutorSignup", tutor.upload, tutor.addTutor);
router.post("/tutorLogin", tutor.tutoLogin);
router.get("/tutorViewProfile/:id", tutor.viewProfile);
router.post("/tutor-forgot-password", tutor.TutorForgetPassword);
router.get("/view-all/tutor",tutor.viewAllTutors) 
router.put("/approveTutor/:id",tutor.ApproveTutorsById)
router.put("/rejectTutor/:id",tutor.rejectTutorsById)
router.get("/viewAllApprovedTutors",tutor.viewAllApprovedTutors)
router.get("/viewAllPendingTutors",tutor.viewAllPendingTutors)
router.get("/viewAllRejectedTutors",tutor.viewAllRejectedTutors)
router.post("/rendBookByTutor" ,rentBookByTutor.addRentBook) 


// booksaddRentBook

router.post("/add-books", books.upload, books.addBooks);
router.get("/viewAllBooks", books.viewAllBook);
router.get("/view-single-product/:id", books.tutorViewSingleProduct);

// rent
router.post("/rendBookByTutor" ,rentBookByTutor.addRentBook) 
router.post("/tutorViewRental",rentBookByTutor.tutorViewRental)

router.post("/rentBooks", rent.addRentBook);

module.exports = router;
