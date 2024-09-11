const studentSchema = require("./studentSchema");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, res, cb) {
    cb(null, "./upload");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage }).single("photo");
const addStudent = async (req, res) => {
  try {
    const { firstname, lastname, email, addNo, password, photo } = req.body;
    const student = new studentSchema({
      firstname,
      lastname,
      email,
      addNo,
      password,
      photo: req.file,
    });
    const existingUser = await studentSchema.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ msg: "Email is already exist" });
    }
    const result = await student.save();
    return res.json({
      status: 200,
      msg: "Registration successfull",
      data: result,
    });
  } catch (error) {
    res.json({
      err: error,
      msg: "error",
      status: 405,
    });
  }
};
//studentLogin
const studentLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const student = await studentSchema.findOne({ email: email });
    if (!student) {
      res.status(405).json({
        msg: "User not found",
      });
    } else if (student.password !== password) {
      res.status(401).json({
        msg: "password mismatch",
      });
    } else if (student.isActive === false) {
      res.status(402).json({ msg: "Admin not approved" });
    } else {
      res.status(200).json({
        msg: "Login success",
        data: student,
      });
    }
  } catch (error) {
    res.json({
      status: 404,
      msg: "Fail",
    });
  }
};

//studentForgotPassword

const studentForgotPassword = async (req, res) => {
  try {
    const { email, newPassword } = req.body;
    const student = await studentSchema.findOne({ email });
    if (!student)
      return res.status(401).json({
        msg: "User Not found",
      });
    student.password = newPassword;
    await student.save();
    res.status(200).json({
      msg: "Password changed",
    });
  } catch (error) {
    res.json({
      status: 400,
      msg: "fail",
    });
  }
};

const deleteStudent = async (req, res) => {
  try {
    const result = await studentSchema.findByIdAndUpdate(
      { _id: req.params.id },
      { isActive: false }
    );
    return res.status(200).json({
      msg: "User deactivated",
      data: result,
    });
  } catch (error) {
    return res.status(404).json({
      msg: "error",
      error: error,
    });
  }
};
//active student

const acceptStudent = async (req, res) => {
  try {
    const result = await studentSchema.findByIdAndUpdate(
      { _id: req.params.id },
      { isActive: true }
    );
    return res.status(200).json({
      msg: "Account activated",
      data: result,
    });
  } catch (error) {
    return res.status(404).json({
      msg: "error",
      error: error,
    });
  }
};

//view all students
const viewAllStudents = async (req, res) => {
  try {
    const students = await studentSchema.find({});
    return res.status(200).json({
      msg: "All user retrieved",
      data: students,
    });
  } catch (error) {
    return res.status(404).json({
      msg: "Error",
      error: error,
    });
  }
};

//viewStudentById

const viewStudentById = async (req, res) => {
  try {
    const student = await studentSchema.findById({ _id: req.params.id });
    return res.status(200).json({
      msg: "Account retrieved",
      data: student,
    });
  } catch (error) {
    return res.status(404).json({ msg: "error", error: error });
  }
};

//viewAllAprrovedStudents

const viewAllApprovedStudents = async (req, res) => {
  try {
    const students = await studentSchema.find({ isActive: true });
    res.status(200).json({
      msg: "Account retrieved",
      data: students,
    });
  } catch (error) {
    res.status(404).json({
      msg: "error",
      error: error,
    });
  }
};

//viewAllRejectedStudents

const viewAllRejectedStudents = async (req, res) => {
  try {
    const students = await studentSchema.find({ isActive: false });
    res.status(200).json({
      msg: "Account retrieved",
      data: students,
    });
  } catch (error) {
    res.status(404).json({
      msg: "error",
      error: error,
    });
  }
};
module.exports = {
  addStudent,
  upload,
  studentLogin,
  studentForgotPassword,
  deleteStudent,
  acceptStudent,
  viewAllStudents,
  viewStudentById,
  viewAllApprovedStudents,
  viewAllRejectedStudents
};
