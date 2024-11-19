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
      return res.status(409).json({ msg: "email ias already exist" });
    }
    const existingUser1 = await tutorSchema.findOne({ idNo });

    if (existingUser1) {
      return res.status(408).json({ msg: "idNo is already exist" });
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
      res.status(405).json({
        msg: "user not found",
      });
    } else if (tutor.password !== password) {
      res.status(409).json({
        msg: "password mismatch",
      });
    } 
    else if(tutor.adminApproved=="rejected" || tutor.adminApproved =="pending")
    {
      res.status(500).json({
        msg:"admin is not approved"
      })
    }
    else {
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
    // const email = await tutorSchema.findOne({ email: req.body.email });
    // if (!email) {
    //   res.status(500).json({
    //     msg: "email is not found",
    //   });
    // } else {
      const tutor = await tutorSchema.findOneAndUpdate(
        { email: req.body.email },
        { password: req.body.password }
      );
      if(tutor!== null)
      {

        res.status(200).json({
          data: tutor,
          msg: "password changed",
        });
      }
      else
      {
        res.status(500).josn({
          msg:"email is not found"
        })
      }
    // }
  } catch (error) {
    res.status(400).json({
      err: error,
      msg: "error",
    });
  }
};

const viewAllTutors = async (req, res) => {
  try {
    const response = await tutorSchema.find({});
    res.status(200).json({
      data: response,
      msg: "data obtained",
    });
  } catch (error) {
    res.status(400).json({
      err: error,
      msg: "error",
    });
  }
};

const ApproveTutorsById = async (req, res) => {
  try {
    const { id } = req.params;

    const tutor = await tutorSchema.findOne({_id:req.params.id});

    if (!tutor) {
      res.status(500).json({
        msg: "no user is found",
      });
    }

    const Updatetutor = await tutorSchema.findByIdAndUpdate(
      {_id:req.params.id} ,
      { adminApproved: "approved" }
    );

    res.status(200).json({
      data: Updatetutor,
      msg: "tutor approved successfully",
    });
  } catch (error) {
    res.status(400).json({
      err: error,
      msg: "error",
    });
  }
};

const viewAllPendingTutors = async (req,res) =>
{
try {
  const allTutor = await tutorSchema.find({adminApproved:"pending"})
res.status(200).json({ 
  data:allTutor,
  msg:"all pending data obtained"
})
} catch (error) {
  res.status(400).json({
    
  err:error,
  msg:"error"
  })
}
}
const viewAllApprovedTutors = async (req,res) =>
{
try {
  const allTutor = await tutorSchema.find({adminApproved:"approved"})
res.status(200).json({ 
  data:allTutor,
  msg:"all pending data obtained"
})
} catch (error) {
  res.status(400).json({
    
  err:error,
  msg:"error"
  })
}
}
const viewAllRejectedTutors = async (req,res) =>
{
try {
  const allTutor = await tutorSchema.find({adminApproved:"approved"})
res.status(200).json({ 
  data:allTutor,
  msg:"all pending data obtained"
})
} catch (error) {
  res.status(400).json({
    
  err:error,
  msg:"error"
  })
}
}


const rejectTutorsById = async (req, res) => {
  try {
    const { id } = req.params;

    const tutor = await tutorSchema.findOne({ _id:req.params.id });

    if (!tutor) {
      res.status(500).json({
        msg: "no user is found",
      });
    }

    const Updatetutor = await tutorSchema.findByIdAndUpdate(
      { _id:req.params.id },
      { adminApproved: "rejected" }
    );
    res.status(200).json({
      data:Updatetutor,
      msg: "tutor rejected successfully",
    });
  } catch (error) {
    res.status(400).json({
      err: error,
      msg: "error",
    });
  }
};
const updateTutorProfile =async (req,res) =>
  {
  try {
    const result = await tutorSchema.findByIdAndUpdate({_id:req.params.id},
      {
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        email:req.body.email,
        idNo:req.body.idNo,
        profile: req.file

      }
      )
      res.status(200).json({
        data:result,
        msg:"profile updated successfully"
      })
  } catch (error) {
    res.status(400).json({
      err:error,
      msg:"error"
    })
  }
  
  }

module.exports = {
  addTutor,
  upload,
  tutoLogin,
  viewProfile,
  TutorForgetPassword,
  viewAllTutors,
  ApproveTutorsById,
  rejectTutorsById,
  viewAllApprovedTutors,
  viewAllPendingTutors,
  viewAllRejectedTutors,
  updateTutorProfile
};
