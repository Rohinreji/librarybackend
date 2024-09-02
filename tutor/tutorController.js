const tutorSchema = require("./tutorScheama");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, res, cb) {
    cb(null, "./upload");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage }).single("profile");

const addTutor = async (req, res) => {
  try {
    const { firstName, lastName, email, idNo, password } = req.body;
    const tutor = new tutorSchema({
      firstName,
      lastName,
      email,
      idNo,
      password,
      profile: req.file,
    });

    const existingUser = await tutorSchema.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ msg: "email is aleready exist" });
    }
    const existingUser1 = await tutorSchema.findOne({ idNo });

    if (existingUser1) {
      return res.status(409).json({ msg: "idNo is already exist" });
    }
    const result = await tutor.save();
    return res.status(200).json({
      data: result,
      msg: "registered sucessfully",
    });
  } catch (error) {
    res.status(405).json({
      err: error,
      msg: "error",
    });
  }
};

const tutoLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const tutor = await tutorSchema.findOne({ email: email });
    if (!tutor) {
      res.status(505).json({
        msg: "user not found",
      });
    } else if (tutor.password !== password) {
      res.status(500).json({
        msg: "login again",
      });
    } else {
      res.status(200).json({
        data: tutor,
        msg: "login sucessfully",
      });
    }
  } catch (error) {
    res.status(400).json({
      err: error,
      msg: "error",
    });
  }
};
const viewProfile = async (req, res) => {
  try {
    const viewProfile = await tutorSchema.findById({ _id: req.params.id });
    res.status(200).json({
      data: viewProfile,
      msg: "tutor profile",
    });
  } catch (error) {
    res.json({
      status: 400,
      err: error,
    });
  }
};

const TutorForgetPassword = async (req, res) => {
  try {
    const email = await tutorSchema.findOne({ email: req.body.email });
    if (!email) {
      res.status(500).json({
        msg: "email is not found",
      });
    } else {
      const tutor = await tutorSchema.findOneAndUpdate(
        { email: req.body.email },
        { password: req.body.password }
      );
      res.status(200).json({
        data: tutor,
        msg: "password changed",
      });
    }
  } catch (error) {
    res.status(400).json({
      err: error,
      msg: "error",
    });
  }
};

module.exports = { addTutor, upload, tutoLogin, viewProfile,TutorForgetPassword };
