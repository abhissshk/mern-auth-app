const express=require("express")
const { signup, Login } = require("../controller/auth.controller")
const { signupValidation, loginValidation } = require("../Middleware/AuthValidation")
const router=express.Router()

router.post("/signup",signupValidation,signup)
router.post("/login",loginValidation,Login)

module.exports=router