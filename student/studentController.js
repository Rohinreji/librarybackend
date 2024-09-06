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
    const student = new studentSchema({
      firstname,
      lastname,
      email,
      password,
      addNo,
      photo: req.file,
    });
    const { firstname, lastname, email, password, addNo } = req.body;
   
    let existingId = await studentSchema.findOne({ email });
    console.log(existingId);
    console.log(existingId,"fdf");
    if (existingId) {
      res.json({
        msg: "Email already exist",
        status: 409,
      });
    }
    await student.save();
    res.json({
      status: 200,
      data: student,
      msg: "Student registeration successfull",
    });
  } catch (error) {
    res.json({
      status: 500,
      error: error,
      msg: error,
    });
  }
};

//studentLogin
const studentLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.json({
        status: 400,
        msg: "All fields are required",
      });
    }
    const student = await studentSchema.findOne({ email });
    if (!student)
      return res.json({
        status: 401,
        msg: "User not found",
      });
    if (student.password !== password)
      return res.json({
        status: 401,
        msg: "password mismatch",
      });
    res.json({
      status: 200,
      msg: "Login success",
      data: student,
    });
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
      return res.json({
        status: 401,
        msg: "User Not found",
      });
    student.password = newPassword;
    await student.save();
    res.json({
      status: 200,
      msg: "Password chamged",
    });
  } catch (error) {
    res.json({
      status: 400,
      msg: "fail",
    });
  }
};
module.exports = { addStudent, upload, studentLogin, studentForgotPassword };
