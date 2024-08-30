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
module.exports = { addStudent,upload};
