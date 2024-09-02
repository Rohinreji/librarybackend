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
    const { firstname, lastname, email, password, addNo } = req.body;
    if (!firstname || !lastname || !email || !password || !addNo) {
      return res.json({ status: 400, msg: "All field are required" });
    }
    let existingId = await studentSchema.findOne({ email });
    if (existingId) {
      res.json({
        msg: "Email already exist",
        status: 409,
      });
    }
    const student = new studentSchema({
      firstname,
      lastname,
      email,
      password,
      addNo,
      photo: req.file,
    });
    await student.save();
    res.json({
      status: 200,
      data: student,
      msg: "Student registeration successfully",
    });
  } catch (error) {
    console.log(error);
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
    const student = await studentSchema.findOne({ email, password });
    if (!student)
      return res.json({
        status: 401,
        msg: "User not found",
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
module.exports = { addStudent, upload ,studentLogin};
