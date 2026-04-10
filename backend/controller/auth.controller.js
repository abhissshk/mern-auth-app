const express=require("express")
const userModel = require("../models/user.models")

const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")


const signup = async (req, res) => {
  try {
    const { name, email, password, address } = req.body;

    const user = await userModel.findOne({ email });
    if (user) {
      return res.status(409).json({
        message: "User already exists, please login",
        success: false
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
      address
    });

    await newUser.save();

    return res.status(201).json({
      message: "Signup successfully",
      success: true
    });

  } catch (err) {
    console.log(err);
    return res.status(500).json({
            message: err.message,  // 👈 show real error
    //   message: "Internal server error",
      success: false
    });
  }
};


const Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(403).json({
        message: "Auth failed email or password is wrong",
        success: false
      });
    }

    const isPassEqual = await bcrypt.compare(password, user.password);

    if (!isPassEqual) {
      return res.status(403).json({
        message: "Auth failed email or password is wrong",
        success: false
      });
    }

    const jwtToken = jwt.sign(
      { email: user.email, _id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    return res.status(200).json({
      message: "Login success",
      success: true,
      jwtToken,
      user: {
        name: user.name,
        email: user.email
      }
    });

  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Internal server error",
      success: false
    });
  }
};


module.exports={Login,signup}
