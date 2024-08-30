const express= require("express")
const router=express.Router()
const student=require("./student/studentController")

router.post("/student-signUp",student.upload,student.addStudent)
module.exports=router